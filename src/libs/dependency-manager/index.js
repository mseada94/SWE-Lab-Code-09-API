class dependencyManager {
  #dependencies;
  constructor() {
    this.#dependencies = {};
  }

  register(id, builder, mode) {
    if (this.#dependencies[id])
      throw new Error(
        `Another dependency with the same identifier(${id}) has been registered`,
      );

    this.#dependencies[id] = {
      builder,
      mode,
      instance: undefined,
    };

    if (mode === 'static')
      this.#dependencies[id].instance = builder();
  }

  get(id, options) {
    if (!this.#dependencies[id])
      throw new Error(
        `The dependency with the identifier(${id}) is not existed`,
      );

    const { builder, mode, instance } = this.#dependencies[id];
    switch (this.#dependencies[id].mode) {
      case 'transient':
        return builder(options);
      case 'singleton':
        this.#dependencies[id].instance = instance || builder();
        return this.#dependencies[id].instance;
      default:
        return instance;
    }
  }
}
export default new dependencyManager();
