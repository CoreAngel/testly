import styled from 'styled-components';
import { colors } from 'utils/colors';

export const Container = styled.div`
    padding: 0 10px;
    margin: 0 0 20px 0;
`;

export const BackButtonWrapper = styled.div`
    margin-bottom: 20px;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 30px 0;
`;

export const Title = styled.h2`
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 2rem;
`;

export const HeaderText = styled.span`
    margin-left: 10px;
`;

export const Buttons = styled.div`
    display: flex;
    align-items: center;
`;

export const ButtonReset = styled.button`
    background-color: ${colors.Red50};
    color: ${colors.White80};
    font-weight: bold;
    font-size: 1.3rem;
    border: 0;
    padding: 5px 20px;
    margin: 0 10px 0 0;
`;

export const ButtonSave = styled(ButtonReset)`
    background-color: ${colors.Green50};
    margin: 0;
`;

export const ModalContainer = styled.div`
    padding: 60px 20px 20px 20px;
`;

export const ModalText = styled.p`
    font-size: 1.4rem;
    text-align: center;
    margin-bottom: 10px;
`;

export const ModalTextYellow = styled(ModalText)`
    color: ${colors.Yellow};
`;

export const ExitButton = styled.button`
    background-color: transparent;
    color: ${colors.White80};
    border: 0;
    margin: 0;
    padding: 6px;
    position: absolute;
    top: 20px;
    right: 20px;
`;

export const ButtonSaveModal = styled(ButtonSave)`
    margin: 0 15px;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 30px auto 0 auto;
    max-width: 340px;
`;

export const ErrorInfo = styled.p`
    font-size: 1.4rem;
    padding: 5px 10px;
    background-color: ${colors.Red};
`;

export const WarningInfo = styled(ErrorInfo)`
    background-color: ${colors.Yellow};
`;
