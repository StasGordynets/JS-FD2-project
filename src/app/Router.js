import {PubSubService} from "./PubSubService";

import {MessageController} from "./MessageController";
import {MessageModel} from "./MessageModel";
import {MessageView} from "./MessageView";
import {MessageService} from "./MessageService";

import {NameController} from "./NameController";
import {NameModel} from "./NameModel";
import {NameView} from "./NameView";

import {AuthController} from "./AuthController";
import {AuthModel} from "./AuthModel";
import {AuthView} from "./AuthView";

import {ErrorController} from "./ErrorController";
import {ErrorModel} from "./ErrorModel";
import {ErrorView} from "./ErrorView";

import {ChanelController} from "./ChanelController";
import {ChanelModel} from "./ChanelModel";
import {ChanelView} from "./ChanelView";

export class Router {
    constructor(map, rootElement) {
        this.map = map;
        this.rootElement = rootElement;
        this.data = '';
        new PubSubService().sub('onAuthUser', data => {
            this.data = data;
            location.hash = `dialog`;
        });

        // Подписаться на событие hashchange
        window.addEventListener('hashchange', this.onhashchange.bind(this));
    }

    onhashchange(e) {
        const activeHash = document.location.hash;
        // Отрисовать страницу для нового адреса
        this._route(activeHash);
    }

    _route(route) {
        const settings = this.map[route];
        if (settings) {
            this.rootElement.innerHTML = '';
            // запустить контроллер страницы,
            // которая соответствует адресу,
            // на который нужно перейти
            settings.runController(this.rootElement, this.data);
        }
    }

    navigateTo(route, data) {
        // Выполнить начальную навигацию на адрес по умолчанию
        if (document.location.hash === route && this.loaded) return;
        this._route(route);
        document.location.hash = route;
        this.loaded = true;
    }
}

new Router({
    '#auth': {
        runController: rootElement => {
            new AuthController(
                new AuthModel(),
                new AuthView(rootElement),
            );
        }
    },
    '#chanel': {
        runController: rootElement => {
            new ChanelController(
                new ChanelModel(),
                new ChanelView(rootElement)
            );
        }
	},
    '#dialog': {
        runController: (rootElement, data) => {
            new MessageController(
                new MessageModel(data),
                new MessageView(rootElement),
                new MessageService(),
            );
            new NameController(
                new NameModel(data),
                new NameView(rootElement),
            );
        }
    },
    '#error': {
        runController: rootElement => {
            new ErrorController(
                new ErrorModel(data),
                new ErrorView(rootElement),
            );
        }
    },
}, document.getElementById('divMain')).navigateTo('#auth');
