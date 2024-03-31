import { Action, ID } from '../../types/common';
import DataEditor from './DataEditor';
import HistoryPopup from './History';

interface IProps {
  listId?: ID;
  taskId?: ID;
  action?: Action;
  boardEntity?: keyof typeof modalPopups | null;
}
const modalPopups: { [key: string]: (props?: IProps) => React.ReactNode } = {
  history: () => <HistoryPopup />,
  dataEditor: (props?: IProps) => <DataEditor {...props} />,
};

export default modalPopups;
