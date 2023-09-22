// Se define una función llamada helpHttp que devuelve un conjunto de funciones para realizar solicitudes HTTP
export const helpHttp = () => {
  // Se define la función customFetch para llevar a cabo solicitudes HTTP personalizadas
  const customFetch = (endpoint, options) => {
    // Se configuran los encabezados por defecto
    const defaultHeader = {
      accept: "application/json",
    };
    // Se crea un nuevo controlador de aborto para cancelar la solicitud si es necesario
    const controller = new AbortController();
    options.signal = controller.signal;
    // Se establece el método por defecto a "GET" si no se proporciona
    options.method = options.method || "GET";
    // Se combinan los encabezados por defecto con los encabezados proporcionados si existen
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;
    // Se convierte el cuerpo a JSON y se asegura de que exista si es necesario
    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;
    // Se establece una función de tiempo para cancelar la solicitud después de 10 segundos
    setTimeout(() => controller.abort(), 20000);
    // Se realiza la solicitud fetch con la URL y las opciones proporcionadas
    return fetch(endpoint, options)
      .then((res) =>
        // Se maneja la respuesta y se convierten los datos JSON si la respuesta es exitosa
        res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrió un error",
            })
      )
      .catch((err) => err); // Se capturan los errores y se devuelven
  };
  // Se define funciones para diferentes métodos HTTP
  const get = (url, options = {}) => customFetch(url, options);
  const post = (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };
  const put = (url, options = {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  };
  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  // Se devuelve un objeto con las funciones disponibles
  return {
    get,
    post,
    put,
    del,
  };
};