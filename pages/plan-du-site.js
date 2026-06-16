import Link from "next/link"
import Section from "components/base/Section"
import Web from "components/layout/Web"
import styled from "styled-components"
import { Paragraph, SubTitle, Title } from "utils/legal-styles"

export default function PlanDuSite() {
    const LinkList = styled.ul`
        margin: .5rem 0 1.5rem;
        padding-left: 1.5rem;

        li {
            margin: .4rem 0;
        }

        a {
            color: ${(props) => props.theme.colors.main};
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    `

    return (
        <Web>
            <Section>
                <Section.Content>
                    <Title>Plan du site</Title>

                    <Paragraph>
                        Retrouvez l'ensemble des pages disponibles sur le site.
                    </Paragraph>

                    <SubTitle>Simulateur</SubTitle>
                    <LinkList>
                        <li>
                            <Link href={'/'}>Accueil</Link>
                        </li>
                        <li>
                            <Link href={'/integration'}>Exemple d'intégration iframe</Link>
                        </li>
                        <li>
                            <Link href={'/iframe'}>Version iframe du simulateur</Link>
                        </li>
                    </LinkList>

                    <SubTitle>Informations légales</SubTitle>
                    <LinkList>
                        <li>
                            <Link href={'/mentions-legales'}>Mentions légales</Link>
                        </li>
                        <li>
                            <Link href={'/politique-cookies'}>Politique de cookies</Link>
                        </li>
                        <li>
                            <Link href={'/plan-du-site'}>Plan du site</Link>
                        </li>
                    </LinkList>
                </Section.Content>
            </Section>
        </Web>
    )
}
