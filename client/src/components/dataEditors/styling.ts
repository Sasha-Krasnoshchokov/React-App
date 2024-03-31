import styled from 'styled-components';

export const EditorTitleWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  row-gap: 12px;
  width: 100%;
  @media (max-width: 720px) {
    flex-wrap: wrap-reverse;
  }
`;

export const EditorTitle = styled.label`
  display: flex;
  align-items: center;
  margin-right: 8px;
  width: 100%;
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;

  & input {
    background: rgba(var(--main-tooltip-bg-rgb), 0.25);
    border: none;
    outline: none;
    width: 100%;
    min-width: 100%;
    min-height: 40px;
    padding: 0 4px;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
`;

export const EditorDescription = styled.label`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 6px;
  width: 100%;
  font-size: 24px;
  font-weight: 600;
  line-height: 28px;

  & textarea {
    background: rgba(var(--main-tooltip-bg-rgb), 0.25);
    border: none;
    outline: none;
    width: 100%;
    min-width: 100%;
    min-height: 72px;
    padding: 4px;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
  }
  & span {
    min-height: 56px;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
  }
`;

export const EditorAction = styled.button<{ $isEdit: boolean; $isDisabled: boolean; $iconUrl: string }>`
  position: relative;
  width: max-content;
  padding: 10px 10px 10px 40px;
  width: 140px;
  min-width: 140px;
  min-height: 40px;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: -1px;
  border: 1px solid rgba(var(--main-dark-rgb), 0.5);
  border-radius: 4px;
  ${({ $isDisabled }) =>
    $isDisabled
      ? `
    color: rgba(var(--main-dark-rgb), 0.35);
    cursor: default;
  `
      : ''}

  &::before {
    content: '';
    position: absolute;
    inset: 8px auto auto 10px;
    width: 20px;
    height: 20px;
    background-image: url(${({ $iconUrl }) => $iconUrl});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    ${({ $isEdit }) =>
      $isEdit
        ? `
      animation: 600ms linear 0s infinite alternate editorIconAnimation;
    `
        : ''}
  }

  &:hover {
    opacity: 0.75;
  }

  @keyframes editorIconAnimation {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.15;
    }
  }
`;
