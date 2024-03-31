import React from 'react';
import styled from 'styled-components';
import { ThreeDotsBtn, ThreeDotsMenuButtons } from './Actions';
import { Action, ID } from '../../types/common';

import deleteIconUrl from '../../assets/delete_red.svg';
import editIconUrl from '../../assets/editor.svg';
import addIconUrl from '../../assets/plus.svg';
import useThreeDotsActions from '../../hooks/useThreeDotsActions';

const menusConfig: Record<Action, { icon: string; color: string; title: string }> = {
  edit: {
    icon: editIconUrl,
    color: '',
    title: 'Edit',
  },
  create: {
    icon: addIconUrl,
    color: '',
    title: 'Create',
  },
  delete: {
    icon: deleteIconUrl,
    color: 'rgb(236, 28, 28)',
    title: 'Delete',
  },
  move: {
    icon: '',
    color: '',
    title: 'Move to',
  },
  addTask: {
    icon: addIconUrl,
    color: '',
    title: 'Add new card',
  },
};
interface IProps {
  menus: Action[];
  listId?: ID;
  taskId?: ID;
}

const ThreeDotsMenu: React.FC<IProps> = ({ menus, listId, taskId }) => {
  const { isOpen, handle3Dots, handleMenuBtn } = useThreeDotsActions(listId, taskId);

  return (
    <DropMenuWrapper>
      <ThreeDotsBtn
        role="button"
        onClick={handle3Dots}
      >
        {isOpen && (
          <DropMenuList id="drop-menu">
            {menus.map((menu) => (
              <React.Fragment key={menu}>
                <DropMenuItem>
                  <ThreeDotsMenuButtons
                    id={menu}
                    $iconUrl={menusConfig[menu].icon}
                    $color={menusConfig[menu].color}
                    onClick={handleMenuBtn}
                  >
                    {menusConfig[menu].title}
                  </ThreeDotsMenuButtons>
                </DropMenuItem>
              </React.Fragment>
            ))}
          </DropMenuList>
        )}
      </ThreeDotsBtn>
    </DropMenuWrapper>
  );
};

export default ThreeDotsMenu;

const DropMenuWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const DropMenuList = styled.ul`
  position: absolute;
  inset: 110% 0 auto auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: max-content;
  min-width: 120px;
  padding: 4px;
  border: 2px solid rgba(var(--main-dark-rgb), 0.5);
  background: #fff;
  border-radius: 4px;
  z-index: 100;
`;

const DropMenuItem = styled.li`
  list-style: none;
  width: 100%;
  border-radius: 4px;

  &:hover {
    background: rgba(var(--main-dark-rgb), 0.15);
  }
`;
