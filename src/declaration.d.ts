// import { compose } from 'redux';

declare module "*.module.css";

declare module "*.svg" {
  const content: any;
  export default content;
}

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }