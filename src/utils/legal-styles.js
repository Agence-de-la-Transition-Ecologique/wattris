import styled from "styled-components";

export const BorderNoteText = styled.div`
          border: 1px solid #eee;
          padding: 1rem;
          font-size: .8rem;
          font-weight: bold;
        `
export const Paragraph = styled.p`
            font-size: .9rem;
        `
export const Title = styled.h1`
            color: ${(props) => props.theme.colors.main};
            font-size: 1.5rem;
            margin-top: 1.5rem;
        `
export const SubTitle = styled.h2`
            color: ${(props) => props.theme.colors.main};
            margin: .9rem 0;
            font-size: 1.3rem;
        `
export const ButtonEulerian = styled.button`
            background-color: ${(props) => props.theme.colors.main};
            color: white;
            display: block;
            margin: 1.4rem auto;
            border: none;
            border-radius: 8px;
            padding: 10px 12px;
        `
export const SubSubTitle = styled.h4`
            color: ${(props) => props.theme.colors.main};
            margin: .9rem 0;
        `