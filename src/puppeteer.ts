import puppeteer from 'puppeteer'

import { ENVIRONMENT } from './config'

type Login = {
  username: string
  password: string
}

const execPuppeteer = async (
  login: Login, urlImage: string,
  commentary: string, qntCommentaries: number
) => {

  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()
  await page.goto(`https://www.instagram.com/`)

  /* const coisas = await page.evaluate(() => {

  }) */

  setTimeout(async () => {
    // Faz o login.
    await page.type('[name="username"]', login.username)
    await page.type('[name="password"]', login.password)
    await page.click('[type="submit"]')

    let count = 0
    setTimeout(async () => {
      // Vai até a foto a comentar.
      await page.goto(urlImage)

      // Comenta a cada tantos segundos
      const seconds = 2 * 1000
      const interval = setInterval(async () => {
        if (count === qntCommentaries) {
          clearInterval(interval)
          await browser.close()

          console.log("Concluído!")

          return
        }

        count++
        await page.type('[aria-label="Adicione um comentário..."]', commentary)
        await page.click('[type="submit"]')

      }, seconds)

    }, 3000)
  }, 5000)
}

const login = {
  username: ENVIRONMENT.user,
  password: ENVIRONMENT.password
}

execPuppeteer(login, 'https://www.instagram.com/p/CKwFKiqrEm-/', 'Testando o robô de novo.', 3)
