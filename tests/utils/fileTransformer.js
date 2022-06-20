import path from "path";
export default {
  process(_, filename) {
    return {
      code: "module.exports = " + JSON.stringify(path.basename(filename)) + ";",
    };
  },
};
