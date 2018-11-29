Keyrsla: Til þess að keyra verkefnið þarf maður byrja á því að slá inn "npm install" í node.js cmd til þess að setja upp verkefnið, svo "npm run test" til þess að finna villur í stíl/uppsetningu verkefnisins og svo "npm run dev" til þess að host-a og opna síðuna.
Þegar maður keyrir verkefnið fyrst fer maður á forsíðuna sem inniheldur lista yfir alla fyrirlestrana, þeir eru skipulagðir í þrjá flokka eftir því hvaða efni þeir fjalla um (html, css og javascript). Á forsíðunni eru þrír takkar sem þegar ýtt er á þá, þá er einungis sýnt fyrirlestrana sem tilheyra sá flokk. Þegar smellt er á einhvern fyrirlestur tekur vafrinn mann á síðu sem birtir fyrirlesturinn, í honum er youtube spilari sem spilar upptöku af fyrirlestrinum ef smellt er á hann. Þegar maður er búinn að fara í gegnum fyrirlesturinn er hægt að smella á "Fyrirlestur kláraður" þá verður textinn grænn og tjékk merki birtist vinstra-meginn við textann og á forsíðunni birtist tjékk merki hægra-meginn við titil fyrirlestursins. Svo getur maður smellt á "Til baka" sem tekur mann aftur á forsíðuna.

Skipulag: Í aðal möppunni eru báðar html skrárnar, öll tæki og tól sem við notuðum í þróun vefsíðunnar, öll modules sem við notum og package skrár, svo er mappan skipt niður í aðrar möppur:

src möppu sem inniheldur allar scss í styles möppunni og javascript skrárnar í lib möppunni, 
scss skárnar eru 7 í heildina fyrst er config.scss sem inniheldur allar css breytur sem notaðar eru í verkefninu, buttons.scss sem geymir stílinn fyrir takkanna á forsíðunni, content.scss sem geymir stílinn fyrir body fyrirlestranna, footer.scss sem geymir stílinn fyrir síðufót allra fyrirlestranna, header.scss sem geymir stílinn fyrir síðuhaus allra síðanna, list.scss sem geymir stílinn fyrir body á forsíðunni og styles.scss sem importar allar hinar scss skrárnar og er svo þýdd yfir á css í lokin.

Javascript-ið er skipulagt í 8 skrár inni í lib möppunni og eina sem er fyrir utan, sorting.js inniheldur virknina fyrir takkanna, header.js og footer.js smíða síðu- hausa og fóta síðanna, content.js og list.js smíða svo body-in fyrir fyrirlestrana og forsíðuna. Lecture.js notar svo header.js, footer.js og content.js til þess að smíða fyrirlestranna og lectures-home.js notar header.js, sorting.js og list.js til þess að smíða forsíðuna, helpers.js inniheldur hjálparföll sem hinar skrárnar nota. Svo er sameinað lectures-home.js og lecture.js í skránna index.js sem er í lokin þýdd yfir í bundle.

 dist möppu sem inniheldur skrárnar bundle.js, sem sameinar allar javascript skrárnar úr src í eina skrá sem html-in nota og styles.css sem þýðir allar scss skrárnar og sameinar þær í eina skrá sem er svo notuð af html-skránum. 
 
 img möppu sem inniheldur allar myndir sem verkefnið notar.
 
 Upplýsingar þeirra sem unnu verkefnið:
 
 Marzúk Ingi Lamsiah Svanlaugar - mil4@hi.is 
 
 Þröstur Almar Þrastarson - thth168@hi.is 
 
 Mikolaj Cymcyk - mic5@hi.is
