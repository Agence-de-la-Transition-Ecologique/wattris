import React from 'react'
import Link from "next/link";
import styled from "styled-components";

const RGPDItem = styled.div`
    padding-bottom: 1rem;
    font-size: 0.75rem;
    font-weight: 300;
    text-align: center;
    background-color: ${(props) => props.theme.colors.background};
    margin: 0 8px;

    a {
        color: #383838;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`

const RGPDWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 0;

`

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

export default function RGPDLinks(props) {
    return (
        <>
            <RGPDWrapper>
                <RGPDItem>
                    <Link key={'MentionsLegales'} href={'/mentions-legales'}>Mentions légales</Link>
                </RGPDItem>
                <RGPDItem>
                    <a href='#tarteaucitron'>Gestion des cookies</a>
                </RGPDItem>
                <RGPDItem>
                    <Link key={'PolitiqueCookies'} href={'/politique-cookies'}>Politique de cookies</Link>
                </RGPDItem>
                <RGPDItem>
                    <Link key={'PlanDuSite'} href={'/plan-du-site'}>Plan du site</Link>
                </RGPDItem>
                <RGPDItem>Accessibilité : non conforme</RGPDItem>
            </RGPDWrapper>
        </>
    )
}