const actionDescription: { [key: string]: (props?: string) => string } = {
  create: (props) => `created a new ${props}`,
  addTask: (props) => `add a new ${props}`,
  edit: (props) => `changed ${props?.includes(' of') ? props : 'from'}`,
  move: (props) => `moved ${props}`,
  delete: (props) => `deleted ${props}`,
  changePriority: () => `changed the priority`,
};
const activitiesGenerator = ({
  creator = '',
  action = '',
  contentDescription = '',
  strongLabel1 = '',
  strongLabel2 = '',
  spanLabel1 = '',
  spanLabel2 = '',
  afterSpanLabel2 = '',
}) =>
  `${creator} ${actionDescription[action as string](contentDescription)}${
    strongLabel1 ? `<strong>${strongLabel1}</strong>` : ''
  } ${strongLabel2 ? ` to <strong>${strongLabel2}</strong>` : ''} ${
    spanLabel1 ? ` from <span>${spanLabel1}</span>` : ''
  } ${spanLabel2 ? ` ${!spanLabel1 ? 'in' : 'to'} <span>${spanLabel2}</span>` : ''} ${afterSpanLabel2}`;

export default activitiesGenerator;
