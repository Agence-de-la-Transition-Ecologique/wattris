import React from 'react'
import Link from "next/link";
import styled from "styled-components";

export default function LegalLinks(props) {
    const LegalItem = styled.div`
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
    const LegalWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 0;

`

    return (
        <>
            <LegalWrapper>
                <LegalItem>
                    <Link key={'MentionsLegales'} href={'/mentions-legales'}>Mentions légales</Link>
                </LegalItem>
                <LegalItem>
                    <a href='#tarteaucitron'>Gestion des cookies</a>
                </LegalItem>
                <LegalItem>
                    <Link key={'PolitiqueCookies'} href={'/politique-cookies'}>Politique des cookies</Link>
                </LegalItem>
                <LegalItem>
                    <Link key={'PolitiqueDonnees'} href={'/politique-protection-donnees'}>Politique de protection des données personnelles</Link>
                </LegalItem>
                <LegalItem>
                    <Link key={'PlanDuSite'} href={'/plan-du-site'}>Plan du site</Link>
                </LegalItem>
                <LegalItem>Accessibilité : non conforme</LegalItem>
            </LegalWrapper>
        </>
    )
}