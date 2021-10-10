import path from "path";
export default {
  process(_, filename) {
    return "module.exports = " + JSON.stringify(path.basename(filename)) + ";";
  },
};
