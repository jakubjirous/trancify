interface Constraints {
  maxFileSize: number;
}

const CONSTRAINTS: Constraints = {
  maxFileSize: 5 * 1024 * 1024, // 5 MB
};

export default CONSTRAINTS;
