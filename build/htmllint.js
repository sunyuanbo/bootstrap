#!/usr/bin/env node

/*!
 * Script to run vnu-jar if Java is available.
 * Copyright 2017 The Bootstrap Authors
 * Copyright 2017 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

'use strict'

const childProcess = require('child_process')
const vnu = require('vnu-jar')

childProcess.exec('java -version', function (error) {
  if (error) {
    console.error('Skipping HTML lint test; Java is missing.')
    return
  }

  const ignore = 'error: Element "img" is missing required attribute "src".'

  const args = [
    '-jar',
    vnu,
    '--asciiquotes',
    '--errors-only',
    `--filterpattern=${ignore}`,
    '--skip-non-html',
    '_gh_pages/'
  ]

  const java = childProcess.spawn('java', args, { stdio: 'inherit' })

  java.on('exit', process.exit)
})
