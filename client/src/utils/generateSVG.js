import React, { useRef, useState, useEffect } from 'react'

const generateRandomDatasets = () => (
    Array(10).fill(0).map(() => ([
        Math.random() * 80 + 10,
        Math.random() * 35 + 10
    ]))
)