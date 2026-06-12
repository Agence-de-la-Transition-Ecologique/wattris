import React from "react";
import { GoogleTagManager } from '@next/third-parties/google'

export default function HeadScripts() {
    const gaId = process.env.ID_GTM || 'GTM-5BVCVHL7';

    return (
        <>
            <link rel="dns-prefetch" href="//cdntag.tarteaucitron.io" />
            <link rel="preconnect" href="https://cdntag.tarteaucitron.io" crossOrigin="" />
            <script src="https://cdntag.tarteaucitron.io/load.js?domain=wattris.ademe.fr&uuid=2df1000bf385655312abede8e30421664e7d594e" defer></script>

            <GoogleTagManager gtmId={gaId} />
        </>
    );
}