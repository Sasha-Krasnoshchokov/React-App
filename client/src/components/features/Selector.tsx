import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ThreeDotsBtn, ThreeDotsMenuButtons } from './Actions';
import { ISelectorOption } from '../../types/common';

import arrowDownUrl from '../../assets/arrow-down.svg';

interface IProps {
  options: ISelectorOption[];
  isThreeDots?: boolean;
  defaultTitle: string;
  staticTitle?: string;
  containerWidth?: string;
  getSelectedOption: (option: ISelectorOption) => void;
}

const Selector: React.FC<IProps> = ({
  options,
  defaultTitle,
  staticTitle,
  isThreeDots,
  containerWidth,
  getSelectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<string | null>(null);

  const handleOpenBtn = () => {
    setIsOpen(!isOpen);
  };
  const handleMenuBtn = (option: ISelectorOption) => () => {
    setIsOpen(!isOpen);
    setTitle(option.title);
    getSelectedOption(option);
  };

  useEffect(() => {
    if (!title && defaultTitle) {
      setTitle(defaultTitle);
    }
  }, [defaultTitle, title]);

  return (
    <SelectorWrapper $width={containerWidth}>
      {(staticTitle || title) && (
        <SelectorTitle
          $isOpen={isOpen}
          onClick={handleOpenBtn}
        >
          {staticTitle || title}
        </SelectorTitle>
      )}
      {isThreeDots && (
        <ThreeDotsBtn
          role="button"
          onClick={handleOpenBtn}
        />
      )}
      {isOpen && (
        <SelectorList id="drop-menu">
          {options.map((option) => (
            <React.Fragment key={option.key}>
              <SelectorItem>
                <ThreeDotsMenuButtons
                  id={option.key}
                  $iconUrl={option.iconUrl}
                  $color={option.color}
                  onClick={handleMenuBtn(option)}
                >
                  {option.title}
                </ThreeDotsMenuButtons>
              </SelectorItem>
            </React.Fragment>
          ))}
        </SelectorList>
      )}
    </SelectorWrapper>
  );
};

export default Selector;

const SelectorWrapper = styled.div<{ $width?: string }>`
  position: relative;
  width: ${({ $width }) => $width ?? 'max-content'};
  min-width: 100px;
`;

const SelectorTitle = styled.button<{ $isOpen: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  font-size: inherit;
  line-height: inherit;
  padding: 4px 32px 4px 8px;
  border-radius: 4px;
  background: rgba(var(--main-tooltip-bg-rgb), 0.25);

  &::after {
    content: '';
    position: absolute;
    position: absolute;
    inset: 50% 4px auto auto;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-image: url(${arrowDownUrl});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
  ${({ $isOpen }) =>
    $isOpen &&
    `
      &::after {
        transform: rotateZ(180deg) translateY(50%);
      }
  `}

  &:hover {
    opacity: 0.75;
  }
`;

const SelectorList = styled.ul`
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
  z-index: 10;
`;

const SelectorItem = styled.li`
  list-style: none;
  width: 100%;
  border-radius: 4px;

  &:hover {
    background: rgba(var(--main-dark-rgb), 0.15);
  }
`;
