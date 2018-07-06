const hostnameRegex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;

const httpRegex = /^(http|https):\/\/(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;

const httpsRegex = /^https:\/\/(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;

const usernameRegex = /^\w+(@[\w\.\-]+)?$/;

const loginRegex = /^\w{2}(\w+)?$/;

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const phoneRegex = /^[0-9]{10}$/;

const nameRegex = /^[A-ZА-Я0-9\-\.]+$/i;

const proxyRegex = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}:[0-9]{1,5}/;

const base64PrefixRegex = /^data/;

export default {
  hostnameRegex,
  httpRegex,
  httpsRegex,
  usernameRegex,
  loginRegex,
  emailRegex,
  phoneRegex,
  nameRegex,
  proxyRegex,
  base64PrefixRegex,
};
