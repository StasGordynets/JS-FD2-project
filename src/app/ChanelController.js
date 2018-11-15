export class ChanelController {
	constructor(model, view) {
		this.model = model;
		this.view = view;
		this.view.render();
		this.model.getStorage(this.model.stringChanel)
			.then(response => {
				this.model.chanelTemp = this.service.readReady(response, this.model.chanelTemp)
				return this.model.getStorage(this.model.stringPerson)
			})
			.then(response => {
				this.model.personTemp = this.service.readReady(response, this.model.personTemp)
				this.view.chanelList(this.model.personTemp, 'vika');
				this.clickEvent (this.service, this.view, this.model, 'vika');//this.model.user
				this.clickCreate (this.service, this.view, this.model, 'vika');
			});
	}
	
	clickEvent (service, view, model, user) {
		let list = document.getElementById('chanel-list');
		list.addEventListener("click", function(evt) {
			evt.preventDefault();
			if (evt.target.parentElement.classList.value.indexOf('delete') != -1) { // удаление канала
				service.delChanel(evt.target.parentElement, model.chanelTemp, model.personTemp, user);
				view.chanelList(model.personTemp, user);
			} else if (evt.target.classList.value.indexOf('channel-link') != -1) { // переход на канал
				service.checkChannel(evt.target);
			}
		}
	}

	clickCreate (service, view, model, user) {
		let button = document.getElementById('create-channel');
		button.addEventListener("click", function(evt) {
			evt.preventDefault();
			service.cChanel(model.chanelTemp, model.personTemp, user);
			view.chanelList(model.personTemp, user);
		})
	}
}
