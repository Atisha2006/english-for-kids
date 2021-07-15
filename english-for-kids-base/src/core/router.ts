import { Header } from '../components/header';
import { IContent } from '../models';
import { Context } from './context';

export class Router {
  private routes: Map<string, IContent>;

  private context: Context;

  constructor(routes: Map<string, IContent>, header: Header) {
    this.routes = routes;
    this.context = Context.getInstance();

    const defaultState = this.routes.get(this.context.getActiveState().split('-')[0]);
    if (defaultState) defaultState.render();

    window.onpopstate = () => {
      const activeState = this.routes.get(this.context.getActiveState().split('-')[0]);
      const currentRouteName = window.location.hash.slice(1);
      const module = this.routes.get(currentRouteName.split('-')[0]);
      if (module) {
        if (activeState) {
          activeState.destroy();
        }
        this.context.setActiveState(currentRouteName);
        module.render();
        header.updateActive();
      }
    };
  }
}
