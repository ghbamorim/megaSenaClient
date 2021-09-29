export default class UniqueId {
  uniqueId = 1;
  getUniqueId = () => {
    return this.uniqueId++;
  };
  static instance: UniqueId | undefined = undefined;
  static getInstance = () => {
    if (!this.instance) {
      this.instance = new UniqueId();
    }
    return this.instance;
  };
}
