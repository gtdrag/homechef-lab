module.exports = (plop) => {
  plop.setGenerator('new', {
    description: 'Create a component or screen',
    prompts: [
      {
        type: 'list',
        name: 'kind',
        message: 'What are you making?',
        choices: ['component', 'screen'],
      },
      { type: 'input', name: 'name', message: 'Name:' },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/{{kind}}s/{{pascalCase name}}',
        base: 'plop-templates',
        templateFiles: 'plop-templates/*.hbs',
      },
      {
        type: 'append',
        path: 'src/{{kind}}s/index.js',
        template: "export { default as {{pascalCase name}} } from './{{pascalCase name}}';\n",
        separator: '',
      },
    ],
  });
};
