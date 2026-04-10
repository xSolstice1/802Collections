/**
 * Simple object pool to reduce GC pressure.
 * Pre-allocates objects and reuses them instead of creating new ones.
 */
export class ObjectPool<T> {
  private pool: T[] = [];
  private activeList: T[] = [];
  private factory: () => T;
  private reset: (obj: T) => void;

  constructor(factory: () => T, reset: (obj: T) => void, initialSize = 32) {
    this.factory = factory;
    this.reset = reset;
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(factory());
    }
  }

  acquire(): T {
    const obj = this.pool.length > 0 ? this.pool.pop()! : this.factory();
    this.activeList.push(obj);
    return obj;
  }

  release(obj: T) {
    const idx = this.activeList.indexOf(obj);
    if (idx !== -1) {
      this.activeList.splice(idx, 1);
      this.reset(obj);
      this.pool.push(obj);
    }
  }

  getActive(): T[] {
    return this.activeList;
  }

  releaseAll() {
    for (const obj of this.activeList) {
      this.reset(obj);
      this.pool.push(obj);
    }
    this.activeList.length = 0;
  }

  get activeCount() {
    return this.activeList.length;
  }

  get poolSize() {
    return this.pool.length;
  }
}
