{\rtf1\ansi\ansicpg1252\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 export default async function handler(req, res) \{\
  const \{ query \} = req.body;\
  \
  try \{\
    const response = await fetch('https://api.nlt.to/api/passages', \{\
      method: 'POST',\
      headers: \{\
        'Authorization': `Bearer $\{process.env.NLT_API_KEY\}`,\
        'Content-Type': 'application/json'\
      \},\
      body: JSON.stringify(\{ q: query \})\
    \});\
    \
    const data = await response.json();\
    res.status(200).json(data);\
  \} catch (error) \{\
    res.status(500).json(\{ error: 'NLT search failed' \});\
  \}\
\}}