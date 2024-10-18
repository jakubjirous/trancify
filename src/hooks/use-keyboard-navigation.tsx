"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import KEY from "@/config/keys";
import { usePlayer } from "@/hooks/use-player";
import { Key, Play, SkipBack, SkipForward } from "lucide-react";
import {
  Fragment,
  ReactNode,
  RefObject,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Command = {
  group: Group;
  items: Item[];
};

type Group = "Player" | "Tracklist" | "Volume" | "General";

type Item = {
  icon?: ReactNode;
  description: string;
  shortcuts: string[];
  keys: string[];
  action: () => void;
  disabled?: boolean;
};

type Panel = "sidebar" | "tracklist" | "playing";

type KeyboardNavigationContextType = {
  activePanel: Panel;
  setActivePanel: (panel: Panel) => void;
  registerPanelRef: (panel: Panel, ref: RefObject<HTMLElement>) => void;
  handleKeyNavigation: (e: KeyboardEvent, panel: Panel) => void;
  openCommands: boolean;
  setOpenCommands: (open: boolean) => void;
};

const KeyboardNavigationContext = createContext<
  KeyboardNavigationContextType | undefined
>(undefined);

export function KeyboardNavigationProvider({
  children,
}: { children: ReactNode }) {
  const {
    currentTrack,
    togglePlayPause,
    playNextTrack,
    playPreviousTrack,
    toggleMute,
    increaseVolume,
    decreaseVolume,
  } = usePlayer();

  const [activePanel, setActivePanel] = useState<Panel>("sidebar");

  const [openCommands, setOpenCommands] = useState(false);

  const panelRefs = useRef<Record<Panel, RefObject<HTMLElement> | null>>({
    sidebar: null,
    tracklist: null,
    playing: null,
  });

  const registerPanelRef = useCallback(
    (panel: Panel, ref: RefObject<HTMLElement>) => {
      panelRefs.current[panel] = ref;
    },
    [],
  );

  const handleKeyNavigation = useCallback(
    (e: KeyboardEvent, panel: Panel) => {},
    [],
  );

  const toggleKeyboardCommands = useCallback(() => {
    setOpenCommands((prevState) => !prevState);
  }, [setOpenCommands]);

  const commands: Command[] = useMemo(() => {
    return [
      {
        group: "Player",
        items: [
          {
            shortcuts: ["SPACE"],
            keys: [KEY.Space],
            description: "Play / Pause",
            icon: <Play className="mr-2 size-4" />,
            action: () => togglePlayPause(),
            disabled: !currentTrack,
          },
          {
            shortcuts: ["⌘ →"],
            keys: [`${KEY.Cmd}${KEY.ArrowRight}`],
            description: "Next Track",
            icon: <SkipForward className="mr-2 size-4" />,
            action: () => playNextTrack(),
            disabled: !currentTrack,
          },
          {
            shortcuts: ["⌘ ←"],
            keys: [`${KEY.Cmd}${KEY.ArrowLeft}`],
            description: "Previous Track",
            icon: <SkipBack className="mr-2 size-4" />,
            action: () => playPreviousTrack(),
            disabled: !currentTrack,
          },
        ],
      },
      {
        group: "Volume",
        items: [
          {
            shortcuts: ["⌘ M"],
            keys: [`${KEY.Cmd}${KEY.M}`],
            description: "Mute",
            action: () => toggleMute(),
          },
          {
            shortcuts: ["⌘ ↑"],
            keys: [`${KEY.Cmd}${KEY.ArrowUp}`],
            description: "Increase by 10%",
            action: () => increaseVolume(),
          },
          {
            shortcuts: ["⌘ ↓"],
            keys: [`${KEY.Cmd}${KEY.ArrowDown}`],
            description: "Decrease by 10%",
            action: () => decreaseVolume(),
          },
        ],
      },
      {
        group: "Tracklist",
        items: [],
      },
      {
        group: "General",
        items: [
          {
            shortcuts: ["⌘ K"],
            keys: [`${KEY.Cmd}${KEY.K}`],
            description: "Open keyboard shortcuts",
            action: () => toggleKeyboardCommands(),
          },
        ],
      },
    ];
  }, [
    togglePlayPause,
    toggleMute,
    playPreviousTrack,
    playNextTrack,
    toggleKeyboardCommands,
    currentTrack,
  ]);

  const handleGlobalKeyNavigation = useCallback(
    (e: KeyboardEvent) => {
      if (e.target !== document.body) return;

      const isKeyMatched = (key: string, event: KeyboardEvent) => {
        const modifierKeys = {
          [KEY.Cmd]: event.metaKey,
          [KEY.Option]: event.altKey,
          [KEY.Shift]: event.shiftKey,
          [KEY.Control]: event.ctrlKey,
        };

        for (const [modifier, isPressed] of Object.entries(modifierKeys)) {
          if (key.startsWith(modifier)) {
            const keyWithoutModifiers = key.slice(modifier.length);
            return isPressed && keyWithoutModifiers === event.key;
          }
        }

        return key === event.key;
      };

      const matchedCommand = commands
        .flatMap((commandGroup) => commandGroup.items)
        .find((command) => command.keys.some((key) => isKeyMatched(key, e)));

      if (matchedCommand) {
        e.preventDefault();
        matchedCommand.action();
      }
    },
    [commands],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleGlobalKeyNavigation);

    return () =>
      window.removeEventListener("keydown", handleGlobalKeyNavigation);
  }, [handleGlobalKeyNavigation]);

  return (
    <KeyboardNavigationContext.Provider
      value={{
        activePanel,
        setActivePanel,
        registerPanelRef,
        handleKeyNavigation,
        openCommands,
        setOpenCommands,
      }}
    >
      {children}
      <CommandDialog open={openCommands} onOpenChange={setOpenCommands}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {commands.map((command, idx) => (
            <Fragment key={idx}>
              <CommandGroup heading={command.group}>
                {command.items.map(
                  (
                    { icon, description, shortcuts, action, disabled },
                    idx2,
                  ) => (
                    <CommandItem
                      key={idx2}
                      onSelect={() => {
                        action();
                        setOpenCommands(false);
                      }}
                      disabled={disabled}
                    >
                      {icon}
                      <span>{description}</span>
                      <div className="ml-auto flex gap-2">
                        {shortcuts.map((shortcut, idx3) => (
                          <CommandShortcut
                            key={idx3}
                            className="-my-0.5 rounded-md border border-foreground bg-foreground px-2 py-1 text-background"
                          >
                            {shortcut}
                          </CommandShortcut>
                        ))}
                      </div>
                    </CommandItem>
                  ),
                )}
              </CommandGroup>
              {commands.length !== idx && <CommandSeparator />}
            </Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </KeyboardNavigationContext.Provider>
  );
}

export function useKeyboardNavigation() {
  const context = useContext(KeyboardNavigationContext);
  if (context === undefined) {
    throw new Error(
      "useKeyboardNavigation must be used within a KeyboardNavigationProvider",
    );
  }
  return context;
}
