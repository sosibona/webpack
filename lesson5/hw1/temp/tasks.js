import "core-js/modules/es.object.to-string";
import "core-js/modules/es.promise";
var urlServerApi = 'https://5e6b6f91d708a000160b48ba.mockapi.io/api/v1/events';
export var getEvents = function getEvents() {
  return fetch(urlServerApi).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Internal Server Error get');
  }).catch(function (error) {
    return alert(error);
  });
};
export var createNewEvent = function createNewEvent(eventData) {
  return fetch(urlServerApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(eventData)
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Internal Server Error post');
  }).catch(function (error) {
    return alert(error);
  });
};
export var updateEvent = function updateEvent(eventId, updatedEvent) {
  return fetch("".concat(urlServerApi, "/").concat(eventId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(updatedEvent)
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Internal Server Error put');
  }).catch(function (error) {
    return alert(error);
  });
};
export var deleteEvent = function deleteEvent(eventId) {
  return fetch("".concat(urlServerApi, "/").concat(eventId), {
    method: 'DELETE'
  }); // .then(response => {
  //   if (response.ok) {
  //     return response.json()
  //   }
  //   throw new Error('Internal Server Error delete');
  // })
  // .catch((error => alert(error)));
};