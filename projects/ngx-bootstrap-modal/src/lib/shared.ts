import { Observable } from 'rxjs';
export interface INgxBootstrapModalInstance {
  modalEl: HTMLElement;
  shown: Promise<void>;
  hidden: Promise<void>;
  events: Observable<Event>;
  hide: () => Promise<void>;
  handleUpdate: () => void;
}
