// Выход из личного кабинета

const logoutB = new LogoutButton;
logoutB.action = () => {
ApiConnector.logout((cb) => {
    if (cb.success) {
        location.reload();
    } 
  });
}

// Получение информации о пользователе

ApiConnector.current((cb) => {
  if (cb.success) {
    ProfileWidget.showProfile(cb.data);
    console.log(cb.data);
  } 
});

// Получение текущих курсов валюты

const rates = new RatesBoard;
setInterval((
  ApiConnector.getStocks((cb) => {
    if (cb.success) {
      rates.clearTable();
      rates.fillTable(cb.data);
    } 
  })
), 60000);

// Операции с деньгами 

const money = new MoneyManager;
money.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (cb) => {
    console.log(cb);
    if (cb.success) {
      ProfileWidget.showProfile(cb.data);
      money.setMessage(cb.success, 'Деньги зачислены на счёт');
    } else {
      money.setMessage(cb.success, cb.error);
    }
    
  });
}

money.conversionMoneyCallback = (data) => {
  // convertMoney({ fromCurrency, targetCurrency, fromAmount }, callback)
  ApiConnector.convertMoney(data, (cb) => {
    console.log(cb);
    if (cb.success) {
      ProfileWidget.showProfile(cb.data);
      money.setMessage(cb.success, 'Валюта сконвертирована');
    } else {
      money.setMessage(cb.success, cb.error);
    }
  });
}

money.sendMoneyCallback  = (data) => {
  // transferMoney({ to, currency, amount }, callback) 
    // — запрос на перевод денег авторизованного пользователя тому пользователю, чьё id передано

  ApiConnector.transferMoney(data, (cb) => {
    console.log(cb);
    if (cb.success) {
      ProfileWidget.showProfile(cb.data);
      money.setMessage(cb.success, 'Перевод выполнен');
    } else {
      money.setMessage(cb.success, cb.error);
    }
  });
}

// Работа с избранным

const favourites = new FavoritesWidget;
ApiConnector.getFavorites((cb) => {
  console.log(cb);
  if (cb.success) {
    favourites.clearTable();
    favourites.fillTable(cb.data);
    money.updateUsersList(cb.data);
  } 
});

favourites.addUserCallback = (data) => {
  // addUserToFavorites({id, name}, callback)
  ApiConnector.addUserToFavorites(data, (cb) => {
    if (cb.success) {
      console.log(cb);
      favourites.clearTable();
      favourites.fillTable(cb.data);
      money.updateUsersList(cb.data);
      favourites.setMessage(cb.success, 'Контакт добавлен');
    } else {
      console.log(cb);
      favourites.setMessage(cb.success, cb.error);
    }
  });
}
favourites.removeUserCallback = (data) => {
  // removeUserFromFavorites(id, callback)
  ApiConnector.removeUserFromFavorites(data, (cb) => {
    if (cb.success) {
      console.log(cb);
      favourites.clearTable();
      favourites.fillTable(cb.data);
      money.updateUsersList(cb.data);

      favourites.setMessage(cb.success, 'Контакт удалён');
    } else {
      console.log(cb);
      favourites.setMessage(cb.success, cb.error);
    }
  });
}