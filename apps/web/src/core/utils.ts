import { Observable } from "rxjs";

export function toPromise<T>(observable: Observable<T>): Promise<T> {
  return new Promise((resolve) => {
    const subscription = observable.subscribe((data) => {
      resolve(data);
      setTimeout(() => {
        subscription.unsubscribe();
      });
    });
  });
}
