export const greetHello = (req, res) => {
  res.json({
    message: "Hello from backend",
    name: "Paras Upadhyay",
    department: "cse",
    phase: "testing",
  });
};
