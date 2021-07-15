import { DataService, FileApi, Router, States, StatisticService } from '../../core';
import { IContent } from '../../models';
import { CategoriesModule, StatisticModule, WordsModule } from '../contentModules';
import { Footer } from '../footer';
import { Header } from '../header';
import { Switch } from '../swich';

export class App {
  private readonly application: HTMLElement;

  private header: Header;

  private footer: Footer;

  private fileApi: FileApi;

  private dataService: DataService;

  private wordsModule: WordsModule;

  private categoriesModule: CategoriesModule;

  private statisticModule: StatisticModule;

  private statisticService: StatisticService;

  private routeStates = new Map<string, IContent>();

  private switch: Switch;

  private router: Router;

  constructor(private readonly rootElement: HTMLElement) {
    this.fileApi = new FileApi();
    this.dataService = new DataService(this.fileApi);
    this.statisticService = new StatisticService(this.dataService);
    this.statisticService.init();

    this.header = new Header(this.dataService);
    this.footer = new Footer();
    this.application = document.createElement('main');
    this.application.classList.add('main');

    this.wordsModule = new WordsModule(this.application, this.dataService, this.statisticService);
    this.categoriesModule = new CategoriesModule(this.application, this.dataService);
    this.statisticModule = new StatisticModule(this.application, this.statisticService);

    this.switch = new Switch(this.wordsModule);

    this.routeStates.set(States.category, this.categoriesModule);
    this.routeStates.set(States.words, this.wordsModule);
    this.routeStates.set(States.statistic, this.statisticModule);
    this.router = new Router(this.routeStates, this.header);
  }

  render(): HTMLElement {
    this.header.element.append(this.switch.render());
    this.rootElement.append(this.header.render(), this.application, this.footer.render());
    return this.rootElement;
  }
}
