import React, { useContext, useState } from 'react'
import { Container, CssBaseline, Grid } from '@material-ui/core'
import snLogo from './assets/sensenet_logo_transparent.png'
import { NavBarComponent } from './components/navbar'
import MainPanel from './components/mainpanel'
import { RepositoryContext } from './context/repository-provider'
import SharedProvider from './context/shared-context'

/**
 * The main entry point of your app. You can start h@cking from here ;)
 */
export const App: React.FunctionComponent = () => {
  const repo = useContext(RepositoryContext)
  const [monthindicator, setMonthindicator] = useState('')
  repo.reloadSchema()

  /**
   * Month indicator
   */
  document.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    if (scrollTop > 100) {
      const ul = document.querySelectorAll('ul[data-month]')
      ul.forEach((x: HTMLElement) => {
        const rect = x.getBoundingClientRect()
        const elemTop = rect.top
        if (elemTop < 0 && elemTop < -64) {
          setMonthindicator(x.dataset.month ? x.dataset.month : '')
        }
      })
    }
  })

  return (
    <>
      <CssBaseline />
      <NavBarComponent month={monthindicator} />
      <Container
        maxWidth="lg"
        style={{
          width: '100%',
          minHeight: '80vh',
          display: 'flex',
          marginTop: '65px',
          verticalAlign: 'middle',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${snLogo})`,
          backgroundSize: 'auto',
        }}>
        <Grid container direction="column" justify="center">
          <Grid item xs={12} style={{ alignSelf: 'center' }}>
            <SharedProvider>
              <MainPanel />
            </SharedProvider>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
