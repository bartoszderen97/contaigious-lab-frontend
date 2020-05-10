import React from 'react';

class HomePage  extends React.Component {
    render() {
        return (
            <div>
                <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
                    <div className="col-md-10 p-lg-5 mx-auto my-1">
                        <h1 className="display-4 font-weight-normal">Witaj na stronie Contaigious Lab!</h1>
                        <p className="lead font-weight-normal my-5">Jesteśmy laboratorium zajmującym się badaniami wirusologicznymi od ponad 15 lat. W czasie naszego istnienia przez lata, każdy członek naszego zespołu szlifował fach i poszerzał swoją wiedzę w raz z najbardziej cenionymi postaciami polskiej jak i zagranicznej sceny medycznej. Przez lata dążyliśmy do perfekcji, każdego dnia poszerzając swoją wiedzę oraz zakres badania dostępny w naszym laboratorium. </p>
                        <img  width="100%" src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.15752-9/78179984_1176152622594740_2267461759822462976_n.jpg?_nc_cat=107&_nc_sid=b96e70&_nc_ohc=zM1Meok-nngAX92wVHW&_nc_ht=scontent-frt3-1.xx&oh=2df69edc6f58fc4577ad8da18bdaf96d&oe=5EDD0219" alt="geny" />
                        <p className="lead font-weight-normal my-5"> Wszyscy dołożyliśmy swoją cegłe do sukcesu contaigious-lab-front tak aby w obecnych czasach sprostać oczekiwaniom naszych pacjentów i móc nieść im pomoc oferując badania na najwyższym poziomie. Nasza oferta mieści w sobie szeroki zakres badań, które w wielu przypadkach prowadzą do wcześniejszego zdiagnozowania choroby a co za tym idzie do zwiększenia szansy na jej wyleczenie. </p>
                        <img  width="100%" src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.15752-9/90569402_583395982252988_5567407814785105920_n.jpg?_nc_cat=104&_nc_sid=b96e70&_nc_ohc=Qc6ncE9ds9cAX8dpcfN&_nc_ht=scontent-frt3-1.xx&oh=6441908665394eb9021a6937f0327e97&oe=5EDFBFCB" alt="ekipa" />
                        <p className="lead font-weight-normal my-5">U nas mają państwo możliwość wykonania podstawowych badań ale również te najbardziej zawansowane przy użyciu najwyższej jakości sprzętu pozwalającego precyzyjne dokonać diagnozy są u nas dostępne. Serdecznie zapraszamy do zapoznania się z ofertą naszego laboratorium. </p>
                     </div>
                </div>
            </div>
        );
    }
}

export default HomePage;