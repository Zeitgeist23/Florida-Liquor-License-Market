import "server-only";

import { APPROVED_BROKER_RECIPIENTS } from "@/data/approved-broker-directory";
import type { ListingSubmission } from "@/lib/listing-submission-store";

const EMAIL_LOGO_CONTENT_ID = "fllm-logo@floridaliquorlicensemarket.com";
const EMAIL_LOGO_BASE64 = "iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAABgFBMVEX////+//////7+//7///3//v///v7+/v/+/v7+/f7//v3+/v3+/vz//fz+/f3+/fz+/vr+/fv+/fr9///9/v79/f/9/f79/f39/fv8/v7+/Pv+/Pr9/Pz9/Pr8/P38/Pz8/Pv8+/v7/Pz7+/z7+/v7+/r7+vv6+/z6+vv5+vv5+fv+/Pn++/j9+/j9+vf++/b++vb++vP9+fL8+vf6+ff5+Pb39/j39vf19ffz8/b89uz89OT39O768N/57df46c/45cTu7vDp6u3p5eD24L3127H00p7e3dvT197bzrzwxofwwXbvuGbcvZC3u8ftrk3nrFLspDnmoz3umRzomCHlmSfpkQ/mkBHjkBXjjw/jjBDnjAXliATglSLgjhLgjBDfihHfiw3fiAy0qZnaihDZhw2eo7GKkaPkhAHdhATefgHOgg95gJSVbzhrdI1gaYRNV3NTPyA8QVYsOVwlJiIaJkkUGiMXGBQNGTIPFRoOFBsJEiINEhULEBIABDUCBQkutzCVAAAj10lEQVR42nVbiVcawZOugeAMYiAIYVAQRDTgAMqhyCFnAFngDUdEUFCja7hCACXk+L1I/vWtngHE7G6/RBGY+brr/Kq7BoABFgAYhgHySyZjZmP+FoivdVrl5ib5UxqKpTP5UqVav7m5rJ9Xi4V8JhXzArXx3rCpYITvi5fIxJuIg9xYO3vNwmwwjFQEYOZ/vwwJ/gNGzhqccoDDaKZQqV42ms3m3c11tVo9P681mp1u975aysVDeKlaxSzmKvwQ/8lk+CbLzlYyB2ZFSHEyDPmcmb8m78tWVhQqvDCULlS+9Hrd60ohl4lHIyGvNxQKR8j6K9fdXq95XkgjtkSNV+lm9xPRyD3ZBQT+MQfGd7TMywxnYmYUsxeragBXKl/t9LrVQiZ+atNQ1FxYQGk2NijKG03ny40OYqccAJsMfi4hQHO5A/NKEOLCccXSF9G+FjQDFIGN5MrNzkUxF1vHC7TmLdeWcW+XZVYkxt3dbaPFqCATYaOZYqPXq2Rw2WqGZmjEfiVylnlBnQEviXY2SeFNnZJRqgBi+XqnWclFyd1VeuMuy5o4Cb62izpjGLOZUarVqA1tLFftdKoIzWwytE7HipiLpTLL0IiBFidnX+xReFfHyuW03AAQL9Q6tUJcC7CmV0iET3V2SLZaWbBDls8mRXSt5YPFtUXBYbpw0azmwrBpfM8o6PlyFm4iWNEM2Lw0meVXtHoVooVur57Hxa4aLEYirkS2ldVBa9xuT/q7kJ1MeGgN20E7uZWFkaBeIFZo9q4zb8AgpQSBvCxIvC9rngOzrHzux+Kg8RWlcIAnVxdgtS6L0QRg4uz+/mSc1GWnLYAW/khOhhDIjnlce7vNA8vKGKOe0qQqvW4xBuo1oGjtku3MIJbcSSYEjgUw0DRjUEK83LzIRwAMxh37fiDbTpr8ftt4zMFgemYNZn+NITvtM9zZEGcxGbdHQ/8uJ1NyH3zwLlPt1HJqqYHR6f4R5WurXo5XBJ5eccBh/qJRjAM4VhjWbg0OpiOW2wlCf5qF0TS7E0xOJlKeLD07YHESQeAmfQgk/GAyoSd4c3h1FJwsu7ze5cjFgHEhfzLQXnG9TohVOp8yW+BAA2HN5n0uORmfmKxBBrG0wylvSiR/jVDc/I6ZH+BsUOz0aBJgsyMedQIGCcSKjWoaHCrh3uwsHL0CRjm/dl5a5YRMvVdGLa3LyBU0qpcslTrxE+lCFjEJqPAfBm3AmbCJ4HiSYFEOQ7R3VnVI+fKNuxy8dVDLd4dlYJAtgTIMhcE+3+0WvNpji06wAfzWDkP0ybT4jV+TLPDjYf9XC4KB0aQ9GCWhjfLHKY38qP4sP8ma/YzO5aIyd72SV2JgXsf/VwHk5ROadoK31L3JwNaR1S5JjFrEb2GH84/HwI77/NOotQ/+LJrTKAv7fLsVVHCJ8dCWGOPy+ekIJ9CGAC7T6oP4da8UWnEsudOyqNlFSsIp6HSOlXCld50Ct8WEAk5OpgOO8bNWYlbD4SCbDALs+T8AJPutDycn5FKrnUkMhk9jFPvTr9FoMsmyfq2SYdG8I5VmOQwHOu1SbHoBXshAwujeH9DhcqeC9gisleOMyeFg+pSEDxwXGA75JLliQwOAqYG82qA0Gvxr1SKB5JkNsv1pPzsdZim/3W48sYPFAaFisxwBp1H32puXgIFmJJh5HRCudIohcCiFeXH+YWI0nfDJoD2IqKsmCih3NJ0rlCqVaqUisICIA6j3R2+As5/1JzyPAg/u7XLmYP8MdnyMp9gph1WG/0vHs7SAjkRRm+pQGQ2CPcBAxffbiDV8avMo7gDH6U9sG6F0vnJeq5+XS6UCDkJE7u/rmLdWgGK20cB44tpBjvObguNf/I7ft+kpNoteiRPlKYF/dbzIgQ6Dr9irhBwnAUliOBrjUqHfRodp+e1btMaXLj10r0u5VPhIM09uGm8M53LZqOZjAPJjGQSHTwm/P8CdjKbtltXOHSk9xUbBZVAxlARe+7HgWkTeEpXjXaFTQTn74eOotbPfn45NrWE2kIBVCrwYBqu5uFejoTRaveqtSqVSr64yRMcUspPzRiXjpI5PPkA2abKCbUiCmtUkMx289RYbeXBuymhG+VrUIh/S6YxuyDerEXDbbWdPeF2AxMb+OMsc7UIoV28U4jhnyrhl1Ct1LCvSGcnKqkpNopM3jb6Qcb4/PgH6fTI7wDjDcawuCeyWJFLt5DS+TXaW9Jesmti4adsHmU49Duv4QTKLXinBRJDNJuGY8uQu7wpR/LJ6bTnez9gbeoNqU4tJqdSrpijKxe0khtOBMijTBaHdAv8xxG+7aXALps2+9mPknrqDt7F6NwNeDs7QI8/QHSH7FIRjK5WuNvMRjdaFcxa41ILHzIAxjbBmlwtZQ6lTCIPDzPqHA5w9hoHRtMViJMk0zyOrW6yYq+bAb0QHU6w7ip08dey3J8dtSGIQGvMjXnJMhQodzDOUy7W9bTTqjWq1khFWSS6SI6RcwbI6lUrBqJF4p+u1NBiOTNAfDTGoj6d9Prjj8wDeY/3AoCX0E97PLVNCGNTmIeQaRa/h2G7rT0gcxgCMRn0Cqeu7DHrwnFXiAMaoJdpFcEHVOt1c5KpNCBV6BcfmsR9aIw79sEXePzreC6GawbGcJHACZPnvXauxei0ODqPJHzgbT9sbKOck4uZ7lYgnEsYRiUSj8VQ6kyvF4dhlVK2iWRu3DCgCtXo9ngp7XBtGo88IGXRIme8EHWvyi4dEC6nJvhfijYsoHChxlfSLcSlQQ25XsZcHj4XDcAXJp2k7yyclx+8KvbxivXwujHr98u7+vtvtlcIUPZeA+MtzfnddrURULrnaAbF6NbTq42wtxEVhT38NbXtH6DClVbeK5PulkLlh8uJE8esuOWQ/gp8YxdPZ+om61ENrU+QaF7UbHLe3N3UymtVCiYzCYsSL3Zu7yxgcSkBxCJHragh8HPBZ/9MU88qgD8eHnnIjDevKJV5NjEupDlXv03Bs2xmgZs0J5I/Z1ZP10n0KDlcdkL//QsZnxK3Vapf1uy6O+/tmA0fzvvulV6nc1z5dxMHD0CyLSem8GmZcHKMltAEl+5RljiF1UQ4hxQDGvACHTSfkOgXKfQLtYevXAPazLR5OqcIdKl1h9EC+WqhWr68RebZwHPXZEN66v6tdXDQKlFOok3x0+LwacqGF8ZOkNajLjpGUONCy8+De0LELXg3gVEfOa1GcVXZyBv3JaIw+HIR8NwUeldbsgjQKHEu0Aq764eGzAFwn0DeXOHAi+A75cR+ltgS+4obITWXL5UN2kAUtnTxD9zxUxy6vogqf2WRa0Fv9ARpvAY79/uF00sKU/tTCcJXpZOBgw2Q2yrGMUBErkkYz9WatJkj7/v5z975+SV5f3dx+/vz54eGhlwOnQrA4J8TvcXm45FE2a7NCYpRkTwUQj1Fnmq3YpPepo5/vY2qfLoiEieR9GyBtQcEcqmliAIzRyLJKheIt1m+FxsXFRa3erKSwUGrWr+pE9J/F0a28ca8L4Qh1mW5kwHGMjLsFJv4JdR1URer16FvL+7lxWS1eMhfqwMIht0sOp+Nhlj0OnVdcTiMNpCRlWCOWGxiwsLqgCp16/Yow13WkF50bFL0wbm9w9fWo6kBL1KxVYMK5iL7FvJ5M8qPpr/4wKzul8s0c1u6yGfCO8W24WoutGlDpiQDhrQNMTIX7qNJnQc7NSEVjkAlx0uV2YH1SzXkV62tOCFW7DwLy7c3VJQLfFUCtICIiodtbrUhUlg9JTOsYg/nhzukGWnuIcUpnOt5exxiOwj9GheBXTmCQdO/HmqhgnLrRaNmFYBIH8gVYketda6l8xgsyjKGMSxEh0hbGpWDd6AZulpaQatNHpUgQQJI4CmYnfHuc8B+juPCtecj0rbvKjZT2FG3/afxrOrAFt4/05TLlxiJVKpdz7H99J2OENRupqoj1aC0oeix/XZAiKr9AAyNW/fmhW9H7dnTCbVWYGe4jlmNTEhlvP5g9A/ZYkuqUDSr9LOZ5JfFG2XV04sfqI5jF3A8nVLqDHqwUEqAd2n9+PD///ZHk/KhmGlYxP2FCQp2TijJeRdzazWfRrh+6Gc2RWcjTCsNK+L4AJDagk2Ak5rNrx/pyMwaO2YrRlzBzoA+PAEsUdsTTp/pyiXIrWUaO+WcX+t+///7950+W8a/AvIQnHyIFodwQPe9+fpib2OeHm9hbl7BHQuFnufvI6jHyTczvH7GmhgT6aA68AqwCNKHzekRyKscoCfYA9HnJRqYTW3ErdKzFYjHaof/nx+8f//l+pvczcrnIz0AqFaxNBgYqkr7uYlC5RUXXaheXFYdETVZMMc51b71AucxYQmcHo9F0wAR3Io2q1z0DhnSnBOrjE/t40kr6WyP/8WG1SLmU4taQHOs0XPGPvwPw74pVl5zcF5Exj1OMzroNuWa9dkmUfCUEzncHa0Lhv3sMuV6UPVKcTUat5AjXxflWi824KOg1QEmjBe/5mexkOkHC4+bSvThjoGRkQRLUDgI///7bF4HJLh1IZcI+CflDx7qd4frtzSyI3F4S+mTQs6zeaLNvha7y4D2C9hk6KUp6zwNpdGXR+MBbvYiY/dw+JsP2cHAGXqpUkRKTBinJupjdBODhAlgUhcAyGVardTpclXsRmKz6to7ASkaBtOQtSS8+x6bWajqbjEncXOciF2WfkJQ3AU3c4d62WdFoMZbDHoSxVMSUTQmMTgT+8/vvCPz2pW0FdlHXGjDvNOuXojtf3d7fRTVGRohOCsdKtIkUbDeIFXS/PUIKd6Igdk2IlAMTYg48a2Dm/IHAaBjA7PA5TKkZilA5GSyAn8DPMYsdx5fqS7ruhFK3LlrX7S2migzlM+N6MYyo1NJykXL4dfz016h9FsgyBkGx64KOS40YdbCKa9X52ezTybGmVAHHi1AXwLsI/LI/s9gplDoNnurdXMfoWd2Kw7X1nibkn0IGWQutHkv4IVbuyOC0PkhjiloXpnxeD9mOT576fAKdvA3B0HkGPFotLk0uRxVy0PqJwM/fg3t+APpVdU9eYzqI3dXqt59n3nxVu0PyjnGdOLNzNYqx1+tnEzxPtyajgMsc65UlAmcNdysbASU/nU4no/aQl+yn65EVp1YopbUo1yMC/IzAyV3/YgP7Zd+MYd0Qr112b0Sjvr26rN0VV5Fl00gIaYNbWy2BL4BcmT+bjkd9OD29rouhK95DFg88n22P0J0CbzYK1S2XyyRuUAAl5ZgWWvWf5x8fd/3MrNZabNKRb7khU01X7udGfXV7Q+oVs4lVMFo98rXzdS2y7D7BhtHJqabUjAq3yGEOOdQKLxPtIWxR5QL4tk0brE7c9jqBFgmZzxirA/9sZpAvIM9ZifdimV5dSBQo8C+oZY/bYiKxVaGGVC1KnQA/2B9Nk+3x0amm0EsLSaLQiyMvHIwCJOtkt7ZDn9DqFMLePFZEVhTv4O9vHM9YFOzOS1r2xa6lKhWkU+dXN1e380zxgEs2MiQBMUqI3GfAZ+dQnEM7huNTKtcTQsi74l3kg4MbZfk+bz9ZPWJiyFLfMqgfclszsqan5+fnPwR6hLF8vpm+fJagcmqRisys+jPRcqOoWltHd2J3bBbPOeZ6P53o9xPkIhcS+AK5ylushvbWkn1IjnlgLB7IfAqhgEBCk61UG7Sf/2JmEoD//uQhYBJMSzLfc0c71xrd7lL3YRa5BCZygdzdi/Iym3Y90mIFPEembBDAYuVbK5qUCBwqV9aO3yRHLX6Y0PDJQ02uvOVUUUKYYAPQ+vuDaJhgY9j8fWbihKpWMq/oSew0HkL0/haJrhBByHjoVr0uO5njKvK5MriDSPqensZYPIIm2hCAI58qmpM3Z7+IO41HwdONfJFyq2gy3V2sWL8/Pz4SVDIwRQ0huAuvThEEw8Z41Ly4uLy9nSsZCQG411DJqyjC65ATgUkCGo37sBGuFwlw9FOJQtYzaLX7w/FIcrpRLFKeXZOCWBZ6wd/vj+jEf2bC/v09ad9fApxtboPTEDpv3ogR5IFQv9plNYwxXEIrSD6KqlB0/QAyjewAbKf1MnHk2KcCHKiDQtW33zry2ioFymMxYcInltX/+/j4U8QUxl8sORcBREhQQqZRYgl0neuKPIRY18UFZj+DljWZ3ZjuY0wA+D6WKHx2pEPgT4SDxBH40EKzO7s7phUwHujLeVK3kAVhpBog8G9BxTNgZE9mdn5iMj+Fw8H6IqnOXMc3WON0K2uubTNrdEPqPoZ0OTvmE8HkaACm0+tPIQG4BG6jSbBRE8e5XecIrKCUBJiDPqr4x++FkgmwHbU/3/4WpU6Tsx6kfYVz1PPVTM/dyrrKoJBiJI9jHjzScTwSL30ClLS3+imMV6YucMVqDI0S9FyTxe26RrfTM8yKKGoReIb8/IcAYwQn0LNBIrqc0Rm3LaeR6waJXqI335edjAPlgVVUJ671c3YAq1UHrAIOq+dkxSkUtVNNuBlJZCq3vloAr56ZRY+5qEVoAdi/VN6+Gm+g1HsQffnq8va+6lEZsOgRVkwdcdZdUUUK8JSrc1ETYDEcqNyaCq5YJVQsZo4Y1/c/z8IQZE10DP5kIvlqfMSBP09C1/dEy3d3d0TULse6kn6DOr6KrhiwKsaEJwMCXC17BKsuUU4Hq0UTYVla5aGKRfCIEyHAz1hD/BSGUE6QgH32/dX4IQx88buNCUfIy6SM7pZgXa1nt72QqYdVBooWaCLNqCBUL78TA8g7p4vsGZkEYCiUpW61YDRE1D8fvi7Gl4tHdKdAcPT3N1m/EM2e//58JAODy1Py9BQLOrJn8XB31S2ASsXq9F50NK+TUEfhAILdoqKdssADUOIOTL86o8WCxuyBXNXtWCfAcsuJCCzsf3xBASJwC4Ks+envi2f/FkXx489TAo6U3kyli051d3eDwGT/EQNIAWP1FvKKt28R13KEsbooxup6+K2TpkmhpKSU6O+1iOT1ir98wboMQ7EI7D/Z+/j97zyUEbMTTOAHllyArvAuj2Xc1dXnboZ2MVI0LqqI/rrFmo1owGbW4qNm2eld8TIKh2CASCYOEpUDoo2UxkU8FcxH0P95iSu9/Pbt280c+IQLAv9nKZrNQ5ofo4HCxVC45staB8s1XKbObPSe55Asay36dCakUamR/on5GAqNFLgVWJs3SS47coUvchRW5AR4D+s1YalfH78+fPn69U4EtmIAfP7xY+5k+OsH1hlBM+gYrc6nSN/fX9WaBYNznWJ3fRtRvK1T5cT836u41W63wG8F6oO/PQ4M5VWszr0un7aM/rVGz6z65w2x0btHwboeBFGbZfhB++8LMro3sn2z4PtSh4OpdjqdXsWFK2aNPsg0IpTB4EBBXGPsxIqt0BGrJ+S5Gp9vNVonK/ZgxZur+lad1CyA/Pwi2Nbj1y+fvz5cPgqRiwE2iKHlh6hhIuenhM1vMhGSJlUbmPxVpYB1zKHRRLypUN226FWbkO/1qmG1x7lWqYUE4GizolUYXZpYPg3MKuWWxWtx8LDaGfDD12+Pj18f8Vft68UC2G7ffRKdCkX9/OOM2QWaFrbtzS5NJJ9DeyFNCpTD6amjtjfoNbUvV4ixR0dvI/XyGzHSnWPMduzYNBSQjWisCzBNuE06IR8PUNSPX799fUT0b49zYMZsPdk9+/5XDGd/iHPrxPNQYByGcCEXd4G434UMtJkCj5nVsu8p0OzajrBUQ0cTdn3KWFcdbpvMLj1J/luohOq7FYVCy+4KwHePD58ecNGfyD8BGDPx7i4y1r/PxK6IYfllJEVJsH6VroA3BBQW9GSvgiG0+lDpVAjbpWrFimIdRZ4TShj8iGwXr9EirTBv+8QNEAXM/BhXfHl58enTxaMo6qNZZkJS8UxsGyt2blfYbqcxFEsorPaMelZHtg6MasqFOWddJZkRU6l6RVrppYQVbyFDKK5hVSrWvDqT1eCtl8Br1IpWfUkiyMPNZe322xfRneyzfGwHfoRkCGWgWz4sJTeZZes1Qj9SlJjrZCRFOCDy+ToslKkqCH/CYkk9I1Iso8Loehk2GGgCPPiJfowh5Ns39OKvXx7//jcBFsubFUyxTyRwzFiQWKgvn5Io3NJi9fCAHCTISB8RMEj9eiXRGtSgKaEnG1TipStYTVOhOhImlV7QMQkglxeYBkiWIMD+3XnTDhtknn4n/X5aXOJL7SwyEyVr2Yg1kG0SO1sBhpabTB5hi222FQGZTkniMJrY+SVqyF+FNw9I+TL4Wbu9w2oIge+/fhH9mF20FwRg9N1+4icpnhHPhJbKZ1a/5aIK1UMJaYMRVmW27evC5+eRt/PtpshFLar0Cf5P6l/KsRlpokcxO0TUl18wVhJf+nb3ZeHHEmFXx45h5AkCe/Oi4p+CjnavRi4ycEAzZDsO7cK07SaLlHrmzQlQRAv3mRiJhNQtuOJDjKeRlXfbYuQSUvEXkpcbc2Ba2E1C4PYIAuZXpfpsHwzfkzqgVPc6MNeLGyZSUDspolb3fC+THNgoVhWz6eLsVOoQGrbbR4DvxVRMduIfGoKOBZuGWYUzhMAu83rQovEoDiHVy1HHpB1phnS4GqnVI4xltpfpM4RJ+EbPlYkGojMi/UdvOyKi/ro8xCTBzq1BBDYz/3SRCEO77UZydeg0ikyYHKqhM+XIvvj8TGLLKcYQNSUXzBIJJ5a8pXrIdCxwrv/85z9/FumPB/sLzIkITC9MWVwY/q3DQIT6ioFbOVe7yeLSh6okgC4OvNQr0fp5RL1Oy8lZnYTsMW06wvXK9ikMnmf0dl6pEmB63s8xA14cBwtlBUMaqmj0WHK24JAw4h4/fmBE3tep6BWO+UY5KIl35cFlNOpEs0AFOVFB+Y1V5NXfxWwvcLvfsyQhOiwBHgjANCyOWGe3UKu91bLTebChE7vxSBxz+ipNsus3X/F7smHUrEfeHqBHzWIARbtRH2lhxX+e5wXM7zmweHI81zHA8mafRIJLdDihWIusukwm0zyoKAy44KrXadkxLo5/FGppqUc8l5YsDMXghEIv1l8qj+e1EzOPIAQY3clO0/PNTRaTFLEiNeb9DjIqVsuIzUMkG627yz0kO8bFgZee0TpX43ckYCsEyxCj37Z7rXTx7Q/R8QvyfMXCBHUYQL6bAxw5jqZJXlQILTsMo3dT+V6GOpg1WxBNMDo3Ob30MqrltipqHZdHeKEaZtGNrEr9Vl/sPS5Xi3/Eok2hwyrW8oHz71qens8gwBKbpGU0ISFYF5h8Lg1Jum7VvPdBp2CUW6pQFYMH4VQvjWS0ghj2VQqcWpIYdaJXgUO1U+g8fv/5+6VOFYClQMmMH+R4afvPnyHZ7uM4HY2eStOkFc6hFM4anG/ErgcytDo9VgrNomPdsdxIhh6EFUS+U3YjU0PRSMSNM4XWuH5U6j0KRGPG3f/yzD4j7u+dZNtPf35gBdHnPwLYxQ01CiO9Yr2AuIZNViFfdPMwjtVY/TIFBtLsudwsyDpUXnKY7l1BpcjErSaGNfm29nDNf/4uxsBywtnM5l2af/r+8u7vp5bWbzYRkStcpLGIbKltzBoBaVyKdN0gLaIuPUqKMLaXrgjCByHVvIyBAS1bJiX7a0LC8amp3MXX/2612jhISyTapEnOmoEnf5K3W8IvHqxAI3txGSFdP49j/F9okgBTJC1VwwrSD/dPHwioCcWveB2ORVxiWS5JIkm8ep6axxqWksD/N2gGE3Co0C2F4RiCSbDiHRTiJj45vu9iQSE4vHQZGHmYwuAqYi2xviZBk9aZWZOZ0w7bYD2C01KvFNNYj/Z29CvkDEbLyLXmD3a7bde8jcnRbv2wa5ZrlRYXaNL1+wylO4GP48kZxzEKhZC8152HFRS006ClFVpGa1zSMXnhXonVySmBAk2ExHnORLrIGOuWGjJXnXwYwLglNF/oyD4P+a0jX1Pga3SXTeQV8XKnFAXfEbJAIn0T0ZgEVtYMmIWqoS3kXpKXbmOyYmLxSp3WhYpAgRwSCiUBcxCGo8kAThiFBcKF3n0+StG6rVXFCmA2EZt95DQZzCqJPFSq2CijTnwM6SBJwr7NxAoTZDE5NC/jxLJA6PyWLRsX6T1VoZp7dUxl5DyN8ZMzwSlvB5sN9hiKNMOW0sLp3JpKpVIIgzVuYj1PPDqSqzYraQoMR9aPo8FgOk5w+yadwFSweLjqZsBBMKQgBZnsde8tqnnNsFYg7U3OlfdcgDRGjH4lgX8a4fT3Nsi9G+eFdMTx2qY0Gm88V7m/KaQo2Dv6EGBa0wQ3mmL24AjNp31UvE4SgVpgHTIpvOrZY0X24FR5io1KZOXAyn3Ijtv7k2FwMJpMx1m532hAKhzLlS9q1VI+k46JzTCxVCZfrN9flzJhjeYI1WyzYhXA46SnbQCTjGIOqeh1r+g4MGN1JZ1tg76seMHW1tWhSrcSgWMU9K8EPx2N2u3pKHtm3dcxRjVeoYlkCpWbZrPRIHQbx6cy1miHoDH5VRBsPWGBrgUbVu7TSbtl48xYOpR7RQ/jVBL1yRFJLl8GnnXVa5UuKlLtEGlbgM8OEDM7nWSxpiAr2QDlJhoIUKFoPJ0hIx2PeimK0uhUFvuHj+1RvzUKYmUolXNCi9LOvg+i5U7Ru2kQaCcjly33lLOLRE4zug0fTrFTjWLhCtAijcyk69DKku2HpxbFmYyqVcV7jUYjHhFrNkxKkgxYP/BkFzyR5Wym9xJml2k9JcEvtISWQ7RhVXhiARbt9PMGlBkhZljFisQJ4UqzGocDDo2jTe7GmchBH6ptCP4PVpNdCF5vttRraoKpSGT51v6OHxUzFng2Z0O6A3wQjtQYP3uVkMpJ8qZMOAGWoce8bgiF+eMJjNDFWc+A5cjvz44nQc5GDufOxv3pAPx2TpIdDfr9VgLjAyT41oDHKNWyWf0coCmPxtmAzWoVDustbyFTbxQO9VtaHVGveHeZjPmneV/kiRLpCpYwrkK3WwpRvg9g62d13O6JMjFpZcmKTWzAhjNoTcZZxs+SppEgOUXBZfqhNR0HsmfDJNiNrIk7BozbV/k3SjXyZcGyyIG3dLk9UuxSnImfhDGXC3K33XIcVkmWsaJPB8bjwRCBObPQ2sZDn7SyBNAExjBsQUDLcZw1MfmVhSx+GGBhzYXJpXeHcWMTBBG/nCXIXq14qRcYv6JcJ33s9ZwDXB8Q186PR3DWR+D9HWR4gymPEYKHE84cGE8GkxZwOhPnJzMaDZ7aSfMOqkuSqfUqcXCptEINK1t+cOBVe+SMn85CqcIB3kKTXGk55vxMdjggrjmA/V2G6HI0HrdkVsa8A8PpiMSKACdnyTee2gnQfnC/hVix0yyEwEEJ5YxgPzKZTPrqGQ121nGwOAQHwtsccshc975gUtrcxK8m7B8RD+z71v298S9+PEnY/aCzkSZ2/heKHfYZE4MZCWOXxQih/FXvOgOqLVrst110jstfRy4iZhm8FLmYzhit5YiKlLrdKumvsViAsX5sjdCgrPBmPEGhDoATDrVR/vxkOuItfjOhNNuoUlem2rkrRFDMupnJylmWXdolWWr6BdJJTzycXfAPsxkTHKa6RhmhYZM8TyQJWDn7yWDyq4VxpWX1WznMCJO2H73rDKxIxY5cFIQylU6zmCKbHOJzTuQpDFheNrucFhnZcmfrrDpSbAKVqSB0LoLfNB5ZGJPd5s9meR744TBp8pv9/Raf3RHuI1nbpIGK5K7JgzhrQFI05iLxuQCyKEbOzp9EegU8V+/8OBpDK0ZFlQIs6XKjUyfPMlE6l2vLLPQZ6oTTog/7NoFsGXf3jATHkyrUCawXjHrxflKZbKlZ939lJ9Gv/3lgRvymbE0B+lTpvte7LqTDQlVo3LJY3lpIfxNrNHJHR5ZN4e1QKl9udhrFtEN42AoWtiQ+1ST7348rsP885rR4GmtWe24ZKU0sV+n1OufFTDz0ZtYJqqUWXbHr4XimUO10muVcjMKSbQVmz98w8rlRzZ/FWH60zPzyGBkx7pcee5EesIzRsrehcaVyxVqj2fhEnixLxWPRSJg8WYYJMleooF5795V8HAOdQiU8NUdYjkywLJnIaWf+8tJlMHumDTGkYvuQVJQNLAldy+i3SH0SSeeK540OovS6N/Xz80+fPl00yV8PlUImRiiRWrHCrMwefQAZ8+ok8P9s3n/9kezfB3boFZl0TUV2IKlQjCyxel2vI/v4VC1XSvlcKuojm3dq1bJvzF/L/nlaTdTx/wCoAyJ09zXl/wAAAABJRU5ErkJggg==";

function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.FLLM_SITE_URL ||
    "https://www.floridaliquorlicensemarket.com"
  ).replace(/\/$/, "");
}

function senderEmail() {
  return process.env.GOOGLE_SENDER_EMAIL || "listings@floridaliquorlicensemarket.com";
}

function escapeHtml(value: string | null | undefined) {
  return (value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatMoney(value: number | null) {
  if (value === null) return "Price not disclosed";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function countyLabel(county: string) {
  const cleaned = county.trim();
  return / County$/i.test(cleaned) ? cleaned : `${cleaned} County`;
}

function approvedEmailTitle(submission: ListingSubmission) {
  if (!submission.listingTitle || !submission.approvedLicenseType) {
    throw new Error("The approved listing is missing its title or license type.");
  }
  return submission.listingTitle;
}

function corporateSignatureHtml() {
  const origin = siteUrl();
  const sender = senderEmail();
  return `
    <div style="height:28px;line-height:28px;font-size:28px;">&nbsp;</div>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;color:#071a3a;border-collapse:collapse;">
      <tr>
        <td style="padding-right:16px;vertical-align:middle;">
          <img src="cid:${EMAIL_LOGO_CONTENT_ID}" width="108" height="108" alt="Florida Liquor License Market" style="display:block;border:0;width:108px;height:108px;">
        </td>
        <td style="border-left:2px solid #c88908;padding-left:16px;vertical-align:middle;">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:22px;font-weight:bold;color:#071a3a;white-space:nowrap;">Florida Liquor License Market</div>
          <div style="margin-top:4px;font-size:12px;line-height:17px;font-style:italic;color:#b87300;">Florida’s marketplace for buying, selling and financing liquor licenses</div>
          <div style="margin-top:9px;font-size:13px;line-height:19px;">
            <span style="color:#071a3a;">✉</span>&nbsp;
            <a href="mailto:${sender}" style="color:#071a3a;text-decoration:none;">${sender}</a>
          </div>
          <div style="font-size:13px;line-height:19px;">
            <span style="color:#071a3a;">●</span>&nbsp;
            <a href="${origin}" style="color:#071a3a;text-decoration:none;">www.floridaliquorlicensemarket.com</a>
          </div>
        </td>
      </tr>
    </table>`;
}

function emailShell(content: string) {
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.5;color:#111111;">
    <div style="max-width:760px;">${content}${corporateSignatureHtml()}</div>
  </body></html>`;
}

async function accessToken() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Google email credentials are incomplete. Configure GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN."
    );
  }

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });
  const payload = (await response.json()) as { access_token?: string; error_description?: string };
  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error_description || "Google OAuth token refresh failed.");
  }
  return payload.access_token;
}

function encodeSubject(subject: string) {
  return `=?UTF-8?B?${Buffer.from(subject, "utf8").toString("base64")}?=`;
}

function base64Url(value: string) {
  return Buffer.from(value, "utf8")
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/g, "");
}

function attachmentBase64(value: Uint8Array) {
  return Buffer.from(value)
    .toString("base64")
    .match(/.{1,76}/g)
    ?.join("\r\n") || "";
}

export async function sendFllmEmail(input: {
  to: string;
  cc?: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
  attachments?: Array<{
    fileName: string;
    contentType: string;
    content: Uint8Array;
  }>;
}) {
  const sender = senderEmail();
  const alternativeBoundary = `fllm-alt-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const relatedBoundary = `fllm-related-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const mixedBoundary = `fllm-mixed-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const headers = [
    `From: Florida Liquor License Market <${sender}>`,
    `To: ${input.to}`,
    ...(input.cc ? [`Cc: ${input.cc}`] : []),
    ...(input.replyTo ? [`Reply-To: ${input.replyTo}`] : []),
    `Subject: ${encodeSubject(input.subject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${mixedBoundary}"`,
    "",
  ];
  const alternative = [
    `--${mixedBoundary}`,
    `Content-Type: multipart/related; boundary="${relatedBoundary}"`,
    "",
    `--${relatedBoundary}`,
    `Content-Type: multipart/alternative; boundary="${alternativeBoundary}"`,
    "",
    `--${alternativeBoundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    input.text,
    "",
    `--${alternativeBoundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    input.html,
    "",
    `--${alternativeBoundary}--`,
    "",
    `--${relatedBoundary}`,
    'Content-Type: image/png; name="fllm-logo.png"',
    "Content-Transfer-Encoding: base64",
    `Content-ID: <${EMAIL_LOGO_CONTENT_ID}>`,
    'Content-Disposition: inline; filename="fllm-logo.png"',
    "",
    attachmentBase64(Buffer.from(EMAIL_LOGO_BASE64, "base64")),
    "",
    `--${relatedBoundary}--`,
  ];
  const attachments = (input.attachments ?? []).flatMap((attachment) => {
    const fileName = attachment.fileName.replace(/["\r\n]/g, "_");
    return [
      `--${mixedBoundary}`,
      `Content-Type: ${attachment.contentType}; name="${fileName}"`,
      "Content-Transfer-Encoding: base64",
      `Content-Disposition: attachment; filename="${fileName}"`,
      "",
      attachmentBase64(attachment.content),
      "",
    ];
  });
  const mime = [...headers, ...alternative, ...attachments, `--${mixedBoundary}--`].join("\r\n");

  const token = await accessToken();
  const response = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: base64Url(mime) }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Gmail API send failed: ${response.status} ${await response.text()}`);
  }
  return response.json() as Promise<{ id: string; threadId: string }>;
}

export type AttorneyDirectoryApplicationEmail = {
  reference: string;
  fullName: string;
  firm: string;
  barNumber: string;
  email: string;
  phone: string;
  city: string;
  counties: string;
  website: string;
  portraitUrl: string;
  biography: string;
  services: string[];
  additionalInformation: string;
  submittedAt: string;
};

function applicationReviewEmail() {
  return process.env.ATTORNEY_DIRECTORY_REVIEW_EMAIL || senderEmail();
}

export async function notifyFllmOfAttorneyApplication(
  application: AttorneyDirectoryApplicationEmail
) {
  const servicesHtml = application.services
    .map((service) => `<li>${escapeHtml(service)}</li>`)
    .join("");
  const servicesText = application.services.map((service) => `- ${service}`).join("\n");
  const portraitHtml = application.portraitUrl
    ? `<br><strong>Portrait URL:</strong> <a href="${escapeHtml(application.portraitUrl)}">${escapeHtml(application.portraitUrl)}</a>`
    : "";

  const details = `
    <p style="margin:0 0 18px;"><strong>A new attorney has applied to the FLLM attorney directory.</strong></p>
    <p style="margin:0 0 18px;">
      <strong>Reference:</strong> ${escapeHtml(application.reference)}<br>
      <strong>Attorney:</strong> ${escapeHtml(application.fullName)}<br>
      <strong>Firm:</strong> ${escapeHtml(application.firm)}<br>
      <strong>Florida Bar number:</strong> ${escapeHtml(application.barNumber)}<br>
      <strong>Email:</strong> <a href="mailto:${escapeHtml(application.email)}">${escapeHtml(application.email)}</a><br>
      <strong>Phone:</strong> ${escapeHtml(application.phone)}<br>
      <strong>Primary city:</strong> ${escapeHtml(application.city)}<br>
      <strong>Service area:</strong> ${escapeHtml(application.counties)}<br>
      <strong>Profile URL:</strong> <a href="${escapeHtml(application.website)}">${escapeHtml(application.website)}</a>
      ${portraitHtml}
    </p>
    <p style="margin:0 0 5px;"><strong>Services:</strong></p>
    <ul style="margin-top:0;">${servicesHtml}</ul>
    <p style="margin:0 0 18px;"><strong>Biography:</strong><br>${escapeHtml(application.biography).replaceAll("\n", "<br>")}</p>
    <p style="margin:0 0 18px;"><strong>Additional information:</strong><br>${escapeHtml(application.additionalInformation || "None provided").replaceAll("\n", "<br>")}</p>
    <p style="margin:0;">The applicant accepted the identity/authority certification, publication consent, and moderated-review agreement.</p>`;

  const text = `A new attorney has applied to the FLLM attorney directory.

Reference: ${application.reference}
Attorney: ${application.fullName}
Firm: ${application.firm}
Florida Bar number: ${application.barNumber}
Email: ${application.email}
Phone: ${application.phone}
Primary city: ${application.city}
Service area: ${application.counties}
Profile URL: ${application.website}
Portrait URL: ${application.portraitUrl || "None provided"}

Services:
${servicesText}

Biography:
${application.biography}

Additional information:
${application.additionalInformation || "None provided"}

The applicant accepted the identity/authority certification, publication consent, and moderated-review agreement.

Submitted: ${application.submittedAt}`;

  return sendFllmEmail({
    to: applicationReviewEmail(),
    subject: `Attorney Directory Application — ${application.fullName} — ${application.reference}`,
    text,
    html: emailShell(details),
  });
}

export async function sendAttorneyApplicationAcknowledgement(
  application: AttorneyDirectoryApplicationEmail
) {
  const firstName = escapeHtml(application.fullName.split(/\s+/)[0] || application.fullName);
  const details = `
    <p style="margin:0 0 18px;">Hello ${firstName},</p>
    <p style="margin:0 0 18px;">Thank you for applying to the Florida Liquor License Market attorney directory.</p>
    <p style="margin:0 0 18px;">Your application has been received for independent review. FLLM may verify your Florida Bar record, firm profile, and submitted practice information or contact you for clarification. Submission does not guarantee publication.</p>
    <p style="margin:0 0 18px;"><strong>Application reference:</strong> ${escapeHtml(application.reference)}<br>
    <strong>Attorney:</strong> ${escapeHtml(application.fullName)}<br>
    <strong>Firm:</strong> ${escapeHtml(application.firm)}</p>
    <p style="margin:0;">No payment was required and no public profile has been created at this stage.</p>`;

  const text = `Hello ${application.fullName.split(/\s+/)[0] || application.fullName},

Thank you for applying to the Florida Liquor License Market attorney directory.

Your application has been received for independent review. FLLM may verify your Florida Bar record, firm profile, and submitted practice information or contact you for clarification. Submission does not guarantee publication.

Application reference: ${application.reference}
Attorney: ${application.fullName}
Firm: ${application.firm}

No payment was required and no public profile has been created at this stage.

Florida Liquor License Market
${senderEmail()}
${siteUrl()}`;

  return sendFllmEmail({
    to: application.email,
    subject: `We Received Your Attorney Directory Application — ${application.reference}`,
    text,
    html: emailShell(details),
  });
}

export async function sendPaymentReceivedEmail(submission: ListingSubmission) {
  const firstName = escapeHtml(submission.firstName || "there");
  const details = `
    <p style="margin:0 0 18px;">Hello ${firstName},</p>
    <p style="margin:0 0 18px;">Thank you for submitting your Florida liquor license listing and completing the $14.95 listing-submission payment.</p>
    <p style="margin:0 0 18px;">Your submission has been received and is now under review. Payment does not guarantee publication. We will send another email after the listing has been reviewed and, if approved, published on the Florida Liquor License Market website.</p>
    <p style="margin:0 0 18px;"><strong>County:</strong> ${escapeHtml(countyLabel(submission.county))}<br>
    <strong>License Type:</strong> ${escapeHtml(submission.licenseType)}<br>
    <strong>Asking Price:</strong> ${escapeHtml(formatMoney(submission.askingPrice))}<br>
    <strong>Submission Reference:</strong> ${escapeHtml(submission.submissionRef)}</p>
    <p style="margin:0;">No further action is required at this time.</p>`;

  const text = `Hello ${submission.firstName || "there"},\n\nThank you for submitting your Florida liquor license listing and completing the $14.95 listing-submission payment.\n\nYour submission has been received and is now under review. Payment does not guarantee publication. We will send another email after the listing has been reviewed and, if approved, published on the Florida Liquor License Market website.\n\nCounty: ${countyLabel(submission.county)}\nLicense Type: ${submission.licenseType}\nAsking Price: ${formatMoney(submission.askingPrice)}\nSubmission Reference: ${submission.submissionRef}\n\nNo further action is required at this time.\n\nFlorida Liquor License Market\n${senderEmail()}\n${siteUrl()}`;

  return sendFllmEmail({
    to: submission.email,
    subject: "We Received Your Florida Liquor License Listing",
    text,
    html: emailShell(details),
  });
}

export async function notifyFllmOfBrokerConsultation(submission: ListingSubmission) {
  const reviewEmail = process.env.BROKER_CONSULTATION_REVIEW_EMAIL || senderEmail();
  const details = `
    <p style="margin:0 0 18px;"><strong>A seller has requested a broker-assisted consultation.</strong></p>
    <p style="margin:0 0 18px;">
      <strong>Reference:</strong> ${escapeHtml(submission.submissionRef)}<br>
      <strong>Name:</strong> ${escapeHtml(submission.fullName)}<br>
      <strong>Email:</strong> <a href="mailto:${escapeHtml(submission.email)}">${escapeHtml(submission.email)}</a><br>
      <strong>Phone:</strong> ${escapeHtml(submission.phone)}<br>
      <strong>County:</strong> ${escapeHtml(countyLabel(submission.county))}<br>
      <strong>License Type:</strong> ${escapeHtml(submission.licenseType)}
    </p>
    <p style="margin:0 0 18px;"><strong>Consultation details:</strong><br>${escapeHtml(submission.message || "None provided").replaceAll("\n", "<br>")}</p>
    <p style="margin:0;">No listing fee was charged. Contact the seller to discuss services and any separate written agreement.</p>`;

  const text = `A seller has requested a broker-assisted consultation.

Reference: ${submission.submissionRef}
Name: ${submission.fullName}
Email: ${submission.email}
Phone: ${submission.phone}
County: ${countyLabel(submission.county)}
License Type: ${submission.licenseType}

Consultation details:
${submission.message || "None provided"}

No listing fee was charged. Contact the seller to discuss services and any separate written agreement.`;

  return sendFllmEmail({
    to: reviewEmail,
    replyTo: submission.email,
    subject: `Broker-Assisted Consultation Request — ${submission.fullName} — ${submission.submissionRef}`,
    text,
    html: emailShell(details),
  });
}

export async function notifyFllmOfBuyerOffer(submission: ListingSubmission) {
  const reviewEmail = process.env.BUYER_LEAD_REVIEW_EMAIL || senderEmail();
  let details: {
    purchaseMethod?: string | null;
    targetClosing?: string | null;
    proofOfFunds?: string | null;
    offerExpiration?: string | null;
    contingencies?: string | null;
    notes?: string | null;
  } = {};
  try {
    details = JSON.parse(submission.message || "{}") as typeof details;
  } catch {
    details.notes = submission.message;
  }

  const content = `
    <p style="margin:0 0 18px;"><strong>A buyer submitted an offer through FLLM.</strong></p>
    <p style="margin:0 0 18px;">
      <strong>Lead Reference:</strong> ${escapeHtml(submission.submissionRef)}<br>
      <strong>Listing:</strong> ${escapeHtml(submission.listingTitle || submission.county)}<br>
      <strong>Listing Reference:</strong> ${escapeHtml(submission.liveListingRef || "Not provided")}<br>
      <strong>Offer Amount:</strong> ${escapeHtml(formatMoney(submission.askingPrice))}<br>
      <strong>Buyer:</strong> ${escapeHtml(submission.fullName)}<br>
      <strong>Email:</strong> <a href="mailto:${escapeHtml(submission.email)}">${escapeHtml(submission.email)}</a><br>
      <strong>Phone:</strong> ${escapeHtml(submission.phone)}
    </p>
    <p style="margin:0 0 18px;">
      <strong>Purchase Method:</strong> ${escapeHtml(details.purchaseMethod || "Not provided")}<br>
      <strong>Target Closing:</strong> ${escapeHtml(details.targetClosing || submission.preferredTiming || "Not provided")}<br>
      <strong>Proof of Funds:</strong> ${escapeHtml(details.proofOfFunds || "Not provided")}<br>
      <strong>Offer Expiration:</strong> ${escapeHtml(details.offerExpiration || "Not provided")}
    </p>
    <p style="margin:0 0 18px;"><strong>Contingencies:</strong><br>${escapeHtml(details.contingencies || "None provided")}</p>
    <p style="margin:0;"><strong>Additional Notes:</strong><br>${escapeHtml(details.notes || "None provided")}</p>`;

  const text = `A buyer submitted an offer through FLLM.

Lead Reference: ${submission.submissionRef}
Listing: ${submission.listingTitle || submission.county}
Listing Reference: ${submission.liveListingRef || "Not provided"}
Offer Amount: ${formatMoney(submission.askingPrice)}
Buyer: ${submission.fullName}
Email: ${submission.email}
Phone: ${submission.phone}
Purchase Method: ${details.purchaseMethod || "Not provided"}
Target Closing: ${details.targetClosing || submission.preferredTiming || "Not provided"}
Proof of Funds: ${details.proofOfFunds || "Not provided"}
Offer Expiration: ${details.offerExpiration || "Not provided"}

Contingencies:
${details.contingencies || "None provided"}

Additional Notes:
${details.notes || "None provided"}`;

  return sendFllmEmail({
    to: reviewEmail,
    replyTo: submission.email,
    subject: `New Buyer Offer — ${submission.liveListingRef || submission.county} — ${formatMoney(submission.askingPrice)}`,
    text,
    html: emailShell(content),
  });
}

type ValuationLeadDetails = {
  kind?: string;
  estimate?: {
    count?: number;
    low?: number | null;
    median?: number | null;
    high?: number | null;
    typicalLow?: number | null;
    typicalHigh?: number | null;
    confidence?: string | null;
    generatedAt?: string | null;
  };
};

function valuationDetails(submission: ListingSubmission) {
  try {
    return JSON.parse(submission.message || "{}") as ValuationLeadDetails;
  } catch {
    return {};
  }
}

function valuationRange(details: ValuationLeadDetails) {
  const low = details.estimate?.typicalLow ?? details.estimate?.low ?? null;
  const high = details.estimate?.typicalHigh ?? details.estimate?.high ?? null;
  if (low === null && high === null) return "No exact county range available";
  if (low === high || high === null) return formatMoney(low);
  if (low === null) return formatMoney(high);
  return `${formatMoney(low)}–${formatMoney(high)}`;
}

export async function notifyFllmOfValuationLead(submission: ListingSubmission) {
  const reviewEmail = process.env.VALUATION_LEAD_REVIEW_EMAIL || senderEmail();
  const details = valuationDetails(submission);
  const content = `
    <p style="margin:0 0 18px;"><strong>A license owner requested follow-up after using the FLLM market estimator.</strong></p>
    <p style="margin:0 0 18px;">
      <strong>Lead Reference:</strong> ${escapeHtml(submission.submissionRef)}<br>
      <strong>Name:</strong> ${escapeHtml(submission.fullName)}<br>
      <strong>Email:</strong> <a href="mailto:${escapeHtml(submission.email)}">${escapeHtml(submission.email)}</a><br>
      <strong>Phone:</strong> ${escapeHtml(submission.phone)}<br>
      <strong>County:</strong> ${escapeHtml(countyLabel(submission.county))}<br>
      <strong>License Type:</strong> ${escapeHtml(submission.licenseType)}<br>
      <strong>License Status:</strong> ${escapeHtml(submission.licenseStatus)}<br>
      <strong>Seller Timing:</strong> ${escapeHtml(submission.preferredTiming || "Not provided")}<br>
      <strong>Target Price:</strong> ${escapeHtml(formatMoney(submission.askingPrice))}
    </p>
    <p style="margin:0 0 18px;">
      <strong>Automated Market Range:</strong> ${escapeHtml(valuationRange(details))}<br>
      <strong>Median Asking Price:</strong> ${escapeHtml(formatMoney(details.estimate?.median ?? null))}<br>
      <strong>Exact Comparables:</strong> ${escapeHtml(String(details.estimate?.count ?? 0))}<br>
      <strong>Data Confidence:</strong> ${escapeHtml(details.estimate?.confidence || "Unavailable")}
    </p>
    <p style="margin:0;">The seller authorized FLLM to contact them about this estimate and selling options.</p>`;

  const text = `A license owner requested follow-up after using the FLLM market estimator.

Lead Reference: ${submission.submissionRef}
Name: ${submission.fullName}
Email: ${submission.email}
Phone: ${submission.phone}
County: ${countyLabel(submission.county)}
License Type: ${submission.licenseType}
License Status: ${submission.licenseStatus}
Seller Timing: ${submission.preferredTiming || "Not provided"}
Target Price: ${formatMoney(submission.askingPrice)}

Automated Market Range: ${valuationRange(details)}
Median Asking Price: ${formatMoney(details.estimate?.median ?? null)}
Exact Comparables: ${details.estimate?.count ?? 0}
Data Confidence: ${details.estimate?.confidence || "Unavailable"}

The seller authorized FLLM to contact them about this estimate and selling options.`;

  return sendFllmEmail({
    to: reviewEmail,
    replyTo: submission.email,
    subject: `New Valuation Lead — ${submission.county} ${submission.licenseType} — ${submission.submissionRef}`,
    text,
    html: emailShell(content),
  });
}

export async function sendValuationLeadAcknowledgement(submission: ListingSubmission) {
  const details = valuationDetails(submission);
  const firstName = escapeHtml(submission.firstName || "there");
  const content = `
    <p style="margin:0 0 18px;">Hello ${firstName},</p>
    <p style="margin:0 0 18px;">We received your request to discuss the FLLM market estimate for your ${escapeHtml(countyLabel(submission.county))} ${escapeHtml(submission.licenseType)} license.</p>
    <p style="margin:0 0 18px;">
      <strong>Current asking-price range:</strong> ${escapeHtml(valuationRange(details))}<br>
      <strong>Median asking price:</strong> ${escapeHtml(formatMoney(details.estimate?.median ?? null))}<br>
      <strong>Comparable listings:</strong> ${escapeHtml(String(details.estimate?.count ?? 0))}<br>
      <strong>Reference:</strong> ${escapeHtml(submission.submissionRef)}
    </p>
    <p style="margin:0 0 18px;">An FLLM representative may contact you to discuss timing, current buyer interest and listing options.</p>
    <p style="margin:0;">This market estimate uses advertised asking prices. It is not an appraisal, verified closed-sale report or guarantee of sale price.</p>`;

  const text = `Hello ${submission.firstName || "there"},

We received your request to discuss the FLLM market estimate for your ${countyLabel(submission.county)} ${submission.licenseType} license.

Current asking-price range: ${valuationRange(details)}
Median asking price: ${formatMoney(details.estimate?.median ?? null)}
Comparable listings: ${details.estimate?.count ?? 0}
Reference: ${submission.submissionRef}

An FLLM representative may contact you to discuss timing, current buyer interest and listing options.

This market estimate uses advertised asking prices. It is not an appraisal, verified closed-sale report or guarantee of sale price.

Florida Liquor License Market
${senderEmail()}
${siteUrl()}`;

  return sendFllmEmail({
    to: submission.email,
    subject: `Your Florida Liquor License Market Estimate — ${submission.submissionRef}`,
    text,
    html: emailShell(content),
  });
}

export async function sendBrokerConsultationAcknowledgement(submission: ListingSubmission) {
  const firstName = escapeHtml(submission.firstName || "there");
  const details = `
    <p style="margin:0 0 18px;">Hello ${firstName},</p>
    <p style="margin:0 0 18px;">We received your request for a broker-assisted consultation regarding your Florida liquor license.</p>
    <p style="margin:0 0 18px;">An FLLM representative will review the information and contact you using your preferred contact method.</p>
    <p style="margin:0 0 18px;"><strong>County:</strong> ${escapeHtml(countyLabel(submission.county))}<br>
    <strong>License Type:</strong> ${escapeHtml(submission.licenseType)}<br>
    <strong>Reference:</strong> ${escapeHtml(submission.submissionRef)}</p>
    <p style="margin:0;"><strong>No payment was required or charged.</strong> This request does not create a brokerage relationship. Any services, exclusivity, or compensation must be stated in a separate written agreement accepted by the parties.</p>`;

  const text = `Hello ${submission.firstName || "there"},

We received your request for a broker-assisted consultation regarding your Florida liquor license. An FLLM representative will review the information and contact you using your preferred contact method.

County: ${countyLabel(submission.county)}
License Type: ${submission.licenseType}
Reference: ${submission.submissionRef}

No payment was required or charged. This request does not create a brokerage relationship. Any services, exclusivity, or compensation must be stated in a separate written agreement accepted by the parties.

Florida Liquor License Market
${senderEmail()}
${siteUrl()}`;

  return sendFllmEmail({
    to: submission.email,
    subject: `We Received Your Broker-Assisted Consultation Request — ${submission.submissionRef}`,
    text,
    html: emailShell(details),
  });
}

export async function sendListingApprovedEmail(submission: ListingSubmission) {
  if (!submission.liveListingUrl || !submission.listingTitle || !submission.approvedLicenseType) {
    throw new Error("The approved listing is missing its title, license type, or live URL.");
  }

  const firstName = escapeHtml(submission.firstName || "there");
  const county = countyLabel(submission.county);
  const listingTitle = approvedEmailTitle(submission);
  const liveUrl = escapeHtml(submission.liveListingUrl);
  const cardImageUrl = `${siteUrl()}/api/listing-email-card/${encodeURIComponent(submission.submissionRef)}`;

  const details = `
    <p style="margin:0 0 18px;">Hello ${firstName},</p>
    <p style="margin:0 0 18px;">Thank you for submitting your paid listing request to Florida Liquor License Market.</p>
    <p style="margin:0 0 18px;">We have completed our review and are pleased to confirm that your listing has been <strong>approved and is now live</strong> on the Florida Liquor License Market website.</p>
    <p style="margin:0 0 6px;"><strong>Listing:</strong>&nbsp;&nbsp; ${escapeHtml(listingTitle)}<br>
    <strong>County:</strong> ${escapeHtml(county)}<br>
    <strong>License Type:</strong> ${escapeHtml(submission.approvedLicenseType)}</p>
    <p style="margin:0 0 22px;"><a href="${liveUrl}" style="color:#0645ad;font-weight:bold;text-decoration:underline;">View live listing</a></p>
    <p style="margin:0 0 18px;">Please review the live listing and reply to this email if any information needs to be corrected or updated.</p>
    <p style="margin:0 0 18px;">Thank you for choosing Florida Liquor License Market.</p>
    <a href="${liveUrl}" style="display:block;text-decoration:none;">
      <img src="${cardImageUrl}" width="680" alt="${escapeHtml(county)} ${escapeHtml(submission.approvedLicenseType)} listing" style="display:block;width:100%;max-width:680px;height:auto;border:0;">
    </a>`;

  const text = `Hello ${submission.firstName || "there"},\n\nThank you for submitting your paid listing request to Florida Liquor License Market.\n\nWe have completed our review and are pleased to confirm that your listing has been approved and is now live on the Florida Liquor License Market website.\n\nListing: ${listingTitle}\nCounty: ${county}\nLicense Type: ${submission.approvedLicenseType}\nView live listing: ${submission.liveListingUrl}\n\nPlease review the live listing and reply to this email if any information needs to be corrected or updated.\n\nThank you for choosing Florida Liquor License Market.\n\nFlorida Liquor License Market\n${senderEmail()}\n${siteUrl()}`;

  return sendFllmEmail({
    to: submission.email,
    subject: `Your ${county} ${submission.approvedLicenseType} Listing Is Now Live`,
    text,
    html: emailShell(details),
  });
}

export type ApprovedBrokerNotificationResult = {
  attempted: number;
  sent: number;
  failed: number;
  failures: Array<{ email: string; error: string }>;
};

export async function notifyApprovedBrokersOfListing(
  submission: ListingSubmission
): Promise<ApprovedBrokerNotificationResult> {
  if (!submission.liveListingUrl || !submission.listingTitle || !submission.approvedLicenseType) {
    throw new Error("The approved listing is missing its title, license type, or live URL.");
  }

  const county = countyLabel(submission.county);
  const listingTitle = approvedEmailTitle(submission);
  const liveUrl = escapeHtml(submission.liveListingUrl);
  const askingPrice = formatMoney(submission.approvedAskingPrice ?? submission.askingPrice);
  const subject = `New FLLM Listing — ${county} ${submission.approvedLicenseType}`;

  const deliveries = await Promise.all(
    APPROVED_BROKER_RECIPIENTS.map(async (broker) => {
      const firstName = escapeHtml(broker.name.split(/\s+/)[0] || broker.name);
      const content = `
        <p style="margin:0 0 18px;">Hello ${firstName},</p>
        <p style="margin:0 0 18px;">Florida Liquor License Market has published a new liquor-license listing that may be relevant to your clients.</p>
        <p style="margin:0 0 18px;">
          <strong>Listing:</strong> ${escapeHtml(listingTitle)}<br>
          <strong>County:</strong> ${escapeHtml(county)}<br>
          <strong>License Type:</strong> ${escapeHtml(submission.approvedLicenseType)}<br>
          <strong>Asking Price:</strong> ${escapeHtml(askingPrice)}<br>
          <strong>Reference:</strong> ${escapeHtml(submission.submissionRef)}
        </p>
        <p style="margin:0 0 18px;"><a href="${liveUrl}" style="color:#0645ad;font-weight:bold;text-decoration:underline;">View the live listing</a></p>
        <p style="margin:0 0 18px;">Availability, price, license status, and transfer eligibility remain subject to confirmation and applicable regulatory requirements.</p>
        <p style="margin:0;">If you prefer not to receive approved FLLM listing notices, reply to this email and we will remove you from the outreach directory.</p>`;

      const text = `Hello ${broker.name.split(/\s+/)[0] || broker.name},

Florida Liquor License Market has published a new liquor-license listing that may be relevant to your clients.

Listing: ${listingTitle}
County: ${county}
License Type: ${submission.approvedLicenseType}
Asking Price: ${askingPrice}
Reference: ${submission.submissionRef}
View the live listing: ${submission.liveListingUrl}

Availability, price, license status, and transfer eligibility remain subject to confirmation and applicable regulatory requirements.

If you prefer not to receive approved FLLM listing notices, reply to this email and we will remove you from the outreach directory.

Florida Liquor License Market
${senderEmail()}
${siteUrl()}`;

      try {
        await sendFllmEmail({
          to: broker.email,
          subject,
          text,
          html: emailShell(content),
        });
        return { email: broker.email, sent: true as const };
      } catch (error) {
        return {
          email: broker.email,
          sent: false as const,
          error: error instanceof Error ? error.message : "Broker notification failed.",
        };
      }
    })
  );

  const failures = deliveries
    .filter((delivery): delivery is { email: string; sent: false; error: string } => !delivery.sent)
    .map((delivery) => ({ email: delivery.email, error: delivery.error }));

  return {
    attempted: deliveries.length,
    sent: deliveries.length - failures.length,
    failed: failures.length,
    failures,
  };
}

