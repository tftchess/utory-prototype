type ScenarioArtProps = {
  kind: 'letter' | 'forest' | 'bookshop'
}

/** Decorative, locally rendered artwork for the three sample scenarios. */
export function ScenarioArt({ kind }: ScenarioArtProps) {
  return (
    <svg
      viewBox="0 0 600 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      {kind === 'letter' && <LetterScene />}
      {kind === 'forest' && <ForestScene />}
      {kind === 'bookshop' && <BookshopScene />}
    </svg>
  )
}

function LetterScene() {
  return (
    <>
      <path fill="#eee5d6" d="M0 0h600v300H0z" />
      <circle cx="442" cy="80" r="43" fill="#f8f2e5" />
      <path d="M0 179Q90 133 194 174T405 175T600 156V300H0Z" fill="#d9d6bf" />
      <path d="M0 218Q158 171 313 209T600 202V300H0Z" fill="#c9cbb4" />
      <path d="M99 116h94v99H99z" fill="#e8d5b9" />
      <path d="m86 119 60-48 60 48Z" fill="#ac8671" />
      <path d="M135 170h25v45h-25z" fill="#b5997c" />
      <path d="M115 134h18v22h-18zm44 0h18v22h-18z" fill="#f7edda" />
      <path d="M447 152h66v67h-66z" fill="#e6d9bf" />
      <path d="m436 155 44-37 45 37Z" fill="#b7a083" />
      <path d="M474 181h16v38h-16z" fill="#bda98b" />
      <path d="M-8 281Q162 246 291 268T608 254V300H-8Z" fill="#b9bda2" />
      <path d="M326 172v128" stroke="#8d7861" strokeWidth="15" />
      <path d="M263 107a58 58 0 0 1 116 0v112H263Z" fill="#ae7560" />
      <path d="M263 108a58 58 0 0 1 58-58v169h-58Z" fill="#bd8b70" />
      <rect x="285" y="106" width="71" height="12" rx="6" fill="#765e50" />
      <rect x="294" y="138" width="53" height="38" rx="3" fill="#e9cbb0" />
      <path d="m302 147 18.5 14 18.5-14m-37 20 13-11m24 11-13-11" fill="none" stroke="#a57d64" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="354" cy="198" r="4" fill="#e9cbb0" />
      <path d="M379 90h25v45h-12V90" fill="#8e6253" />
      <path d="M392 90h41v23h-41z" fill="#cda277" />
      <g transform="rotate(-12 246 248)">
        <rect x="191" y="213" width="113" height="72" rx="4" fill="#f8efdc" />
        <path d="m194 216 53 43 54-43m-107 65 38-34m69 34-38-34" fill="none" stroke="#cdbb9c" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="248" cy="250" r="10" fill="#ba8069" />
        <path d="m244 250 3 3 5-6" fill="none" stroke="#e8cdb1" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <g fill="#8f9b7c" stroke="#8f9b7c" strokeWidth="3">
        <path d="M94 300q6-59-11-91m13 58q27-38 25-64m-26 78q-33-25-47-59" fill="none" />
        <ellipse cx="82" cy="218" rx="8" ry="19" transform="rotate(-22 82 218)" />
        <ellipse cx="113" cy="230" rx="8" ry="18" transform="rotate(24 113 230)" />
        <ellipse cx="61" cy="246" rx="8" ry="19" transform="rotate(-39 61 246)" />
        <path d="M504 300q-2-64 17-98m-15 77q-26-22-29-52m32 28q24-23 35-23" fill="none" />
        <ellipse cx="520" cy="214" rx="8" ry="20" transform="rotate(17 520 214)" />
        <ellipse cx="482" cy="240" rx="8" ry="18" transform="rotate(-24 482 240)" />
        <ellipse cx="534" cy="244" rx="8" ry="19" transform="rotate(49 534 244)" />
      </g>
      <path d="m222 62 9-4 9 4m-24 22 6-3 6 3" fill="none" stroke="#b4aa91" strokeWidth="2" strokeLinecap="round" />
    </>
  )
}

function ForestScene() {
  return (
    <>
      <path fill="#dce3d2" d="M0 0h600v300H0z" />
      <circle cx="335" cy="88" r="48" fill="#f7edcd" />
      <path d="M0 177q87-57 180-22t191-14 229 12v147H0Z" fill="#c3cdb3" />
      <path d="M0 220q83-54 195-36t208-9 197 27v98H0Z" fill="#acbda2" />
      <g fill="#a6b69a">
        <path d="m167 16-43 130h86Zm-44 99-15 65h116l-19-65Z" />
        <path d="m427 9-43 139h89Zm-42 104-15 69h115l-20-69Z" />
        <path d="m503 44-36 111h73Zm-32 93-17 50h99l-21-50Z" />
        <path d="m241 54-30 94h63Zm-27 75-14 45h84l-14-45Z" />
      </g>
      <path d="M286 202q-30 18-5 30t-35 25-55 43h190q-9-20-45-35t-24-29 15-34Z" fill="#e5d8b6" />
      <path d="M299 201q-25 23 4 35t-16 26-16 38" fill="none" stroke="#f1e5c7" strokeWidth="8" opacity=".7" />
      <path d="M303 154h88v64h-88z" fill="#ba9e79" />
      <path d="m290 158 57-49 58 49Z" fill="#7e8c76" />
      <path d="m299 158 48-41 49 41" fill="none" stroke="#ced0af" strokeWidth="3" />
      <path d="M336 178h23v40h-23z" fill="#7e7960" />
      <rect x="367" y="176" width="14" height="18" rx="1" fill="#eee0b0" />
      <path d="M374 177v17m-6-8h12" stroke="#b59b71" strokeWidth="1.5" />
      <path d="M375 129v-25h11v34" fill="#929174" />
      <path d="M380 91q-11-10 2-21t-1-18" fill="none" stroke="#ecedda" strokeWidth="6" strokeLinecap="round" opacity=".7" />
      <g>
        <path d="M73 79h12v221H73z" fill="#7d8870" />
        <path d="m79-21-65 149h130Z" fill="#8b9f82" />
        <path d="m79 49-77 152h153Z" fill="#81967a" />
        <path d="m79 117-91 149h181Z" fill="#738b70" />
        <path d="M528 64h13v236h-13z" fill="#71816a" />
        <path d="m534-26-63 157h127Z" fill="#8c9f80" />
        <path d="m534 51-79 160h157Z" fill="#7a9275" />
        <path d="m534 123-91 153h181Z" fill="#6e886d" />
      </g>
      <path d="M0 285q81-23 151-1t63 16H0Zm404 15q17-30 66-20t130-11v31Z" fill="#8da07e" />
      <g fill="#f0e7c9">
        <circle cx="177" cy="230" r="3" /><circle cx="404" cy="235" r="3" /><circle cx="444" cy="263" r="3" />
        <circle cx="201" cy="271" r="2.5" /><circle cx="134" cy="281" r="2.5" />
      </g>
      <path d="m221 100 7-4 7 4m-11-18 5-3 5 3" fill="none" stroke="#8f9e80" strokeWidth="2" strokeLinecap="round" />
      <path d="M177 280v-23m-4 3h16m-12-5-5 5 5 4" fill="none" stroke="#a4936e" strokeWidth="3" strokeLinecap="round" />
    </>
  )
}

function BookshopScene() {
  return (
    <>
      <path fill="#e8dccb" d="M0 0h600v300H0z" />
      <path d="M0 241h600v59H0z" fill="#cbbb9f" />
      <path d="M0 241h600" stroke="#b7a58a" strokeWidth="3" />
      <path d="m82 300 57-59m134 59 6-59m139 59-44-59m-374 31h600" stroke="#b9a78c" strokeWidth="2" opacity=".5" />
      <rect x="46" y="34" width="211" height="208" rx="3" fill="#b29878" />
      <rect x="58" y="46" width="187" height="185" rx="1" fill="#8b7a62" />
      <path d="M56 106h191M56 167h191" stroke="#c3aa88" strokeWidth="8" />
      <g>
        <path d="M68 58h14v44H68z" fill="#c9c2a3" />
        <path d="M85 63h12v39H85z" fill="#d3b296" />
        <path d="M100 56h18v46h-18z" fill="#9ea78a" />
        <path d="m122 61 12-3 11 42-12 3z" fill="#d8c4a2" />
        <path d="M169 91h57v11h-57z" fill="#c8b497" />
        <path d="M173 79h49v10h-49z" fill="#a9b19b" />
        <path d="M69 126h18v37H69z" fill="#c9a189" />
        <path d="M90 118h12v45H90z" fill="#cbc6aa" />
        <path d="M105 123h17v40h-17z" fill="#aeb39b" />
        <path d="M125 118h13v45h-13z" fill="#cfba92" />
        <path d="m146 123 12-3 12 42-12 3z" fill="#c3a98e" />
        <path d="M180 125h14v38h-14z" fill="#a1ad96" />
        <path d="M197 119h19v44h-19z" fill="#dbc7a5" />
        <path d="M219 129h13v34h-13z" fill="#bc977e" />
        <path d="M68 215h61v12H68z" fill="#c7c5a4" />
        <path d="M74 203h51v10H74z" fill="#c69b7f" />
        <path d="M71 191h58v10H71z" fill="#d6c19d" />
        <path d="M167 186h16v42h-16z" fill="#c3a087" />
        <path d="M186 181h14v47h-14z" fill="#d1c5a3" />
        <path d="m208 188 13-3 11 42-13 3z" fill="#a9b096" />
      </g>
      <g stroke="#f0dfbf" strokeWidth="2" opacity=".65">
        <path d="M72 67h6m25-3h11m-8 30h8m-40 40h10m46-8h5m68 6h11m-34 57h7" />
      </g>
      <path d="M342 61a72 72 0 0 1 144 0v116H342Z" fill="#b69c7b" />
      <path d="M351 62a63 63 0 0 1 126 0v106H351Z" fill="#d6ddc9" />
      <circle cx="438" cy="57" r="24" fill="#f6edcd" />
      <path d="M351 149q35-40 67-15t59-5v39H351Z" fill="#b5c1a1" />
      <path d="M414 0v172m-66-66h132" stroke="#b69c7b" strokeWidth="7" />
      <rect x="333" y="172" width="163" height="9" rx="3" fill="#c7ab86" />
      <path d="M287 0v63" stroke="#9f876b" strokeWidth="3" />
      <path d="m270 62-21 37h76l-21-37Z" fill="#a6ac8f" />
      <ellipse cx="287" cy="99" rx="38" ry="5" fill="#d8cdab" />
      <path d="m266 107-38 87h118l-38-87Z" fill="#f5eac8" opacity=".23" />
      <path d="M275 238v62m187-62v62" stroke="#937c60" strokeWidth="12" />
      <rect x="251" y="225" width="236" height="14" rx="5" fill="#b19673" />
      <path d="M289 215q31-14 64-3 34-11 66 3l-11 13H301Z" fill="#c4a886" />
      <path d="M296 192q28-8 57 4 30-12 57-4l9 30q-34-8-66 1-30-9-65-1Z" fill="#f6ecd5" />
      <path d="M353 196v27m-47-22 33 5m-34 2 34 5m25-7 33-5m-33 12 35-5" stroke="#d3c4a3" strokeWidth="1.5" />
      <path d="M438 198h23v22a10 10 0 0 1-23 0Z" fill="#a7b098" />
      <path d="M461 203h5a7 7 0 0 1 0 14h-5" fill="none" stroke="#a7b098" strokeWidth="4" />
      <path d="M449 190q-6-5 0-10" fill="none" stroke="#f8f0dc" strokeWidth="3" strokeLinecap="round" />
      <path d="M524 245q-3-40 11-72m-9 57q-24-11-22-32m25 18q23-13 27-33" fill="none" stroke="#879675" strokeWidth="3" />
      <ellipse cx="536" cy="182" rx="9" ry="20" fill="#9eab87" transform="rotate(15 536 182)" />
      <ellipse cx="507" cy="206" rx="9" ry="19" fill="#92a17e" transform="rotate(-34 507 206)" />
      <ellipse cx="548" cy="199" rx="9" ry="19" fill="#9eab87" transform="rotate(38 548 199)" />
      <path d="m505 237 7 40h30l7-40Z" fill="#c59c7d" />
      <rect x="501" y="234" width="52" height="8" rx="3" fill="#d0aa89" />
    </>
  )
}
