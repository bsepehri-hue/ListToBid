declare var __dirname: string;
declare var process: NodeJS.Process;

declare module "*.json" {
  const value: any;
  export default value;
}

declare module "*.svg" {
  const content: string;
  export default content;
}
