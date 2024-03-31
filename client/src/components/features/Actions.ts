import styled from 'styled-components';
import circularArrow from '../../assets/circular-arrow.svg';
import plus from '../../assets/plus.svg';
import plusWhite from '../../assets/plus_white.svg';
import shutterUrl from '../../assets/cross_white.svg';
import dotsUrl from '../../assets/3-dots-ver.svg';

const ActionsBtn = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  border-radius: 6px;
  opacity: 0.85;

  &::before {
    content: '';
    position: absolute;
    inset: 50% auto auto 8px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }

  &:hover {
    opacity: 0.75;
  }
`;

export const HistoryButton = styled(ActionsBtn)`
  padding: 6px 12px 6px 32px;
  border: 2px solid rgb(var(--main-dark-rgb));

  &::before {
    background-image: url(${circularArrow});
  }
`;

export const CreateNewListButton = styled(ActionsBtn)`
  padding: 8px 12px 8px 32px;
  color: rgb(var(--main-light-rgb));
  background-color: rgb(var(--main-dark-rgb));

  &::before {
    background-image: url(${plusWhite});
  }
`;

export const Shutter = styled.button`
  position: absolute;
  inset: 12px 12px auto auto;
  width: 24px;
  height: 24px;
  transform: rotateZ(0);
  transition: transform 400ms;

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    background-image: url(${shutterUrl});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }

  &:hover {
    transform: rotateZ(-100deg);
    transition: transform 400ms;
  }
`;

export const ThreeDotsBtn = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-image: url(${dotsUrl});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(var(--main-dark-rgb), 0.15);
  }
`;

export const ThreeDotsMenuButtons = styled.button<{ $iconUrl: string; $color?: string }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
  padding: 4px 6px 4px 28px;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  border-radius: 4px;
  color: ${({ $color }) => $color || 'rgb(var(--main-dark-rgb))'};

  &::before {
    content: '';
    position: absolute;
    inset: 50% auto auto 4px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-image: url(${({ $iconUrl }) => $iconUrl});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
`;

export const AddNewCard = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8px 8px 8px 28px;
  min-height: 36px;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  border: 2px dashed rgba(var(--main-dark-rgb), 0.6);
  border-radius: 4px;

  &::before {
    content: '';
    position: absolute;
    inset: 50% auto auto 4px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-image: url(${plus});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }

  &:hover {
    opacity: 0.75;
  }
`;
