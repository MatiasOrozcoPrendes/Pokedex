import React, { useState, useEffect } from "react";
import {StyleSheet, View, SafeAreaView, FlatList, Alert, KeyboardAvoidingView, Keyboard, ImageBackground, TouchableWithoutFeedback} from "react-native";
import PokeTexto from '../components/PokeTexto';
import PokeEntrada from '../components/PokeEntrada';
import PokeBoton from '../components/PokeBoton';
import PokeImagen from '../components/PokeImagen';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DatabaseConnection from "../database/database-connection";
const db = DatabaseConnection.getConnection();

const ComoVencerlo = () => {
  const [Busqueda, setBusqueda] = useState()
  const [Pokemon, setPokemon]=useState(25);
  const [Nombre, setNombre]=useState("");
  const [Numero, setNumero]=useState();
  const [Tipos, setTipos]=useState([]);
  const [equipo, setEquipo] = useState([]);
  const NombresPokemon = [
    'bulbasaur','ivysaur','venusaur','charmander','charizard','charmeleon','squirtle','wartortle','caterpie','metapod','weedle','butterfree','blastoise','pidgey','beedrill','kakuna','pidgeotto','raticate','rattata','pidgeot','spearow','fearow','ekans','arbok','sandshrew','raichu','sandslash','nidoran-f','pikachu','nidorina','nidorino','nidoking','nidoran-m','clefairy','nidoqueen','ninetales','clefable',
    'vulpix','jigglypuff','zubat','wigglytuff','vileplume','oddish','paras','gloom','parasect','venonat','venomoth','diglett','dugtrio','meowth','persian','psyduck','mankey','golduck','primeape','poliwhirl','poliwag','arcanine','growlithe','poliwrath','abra','machoke','kadabra','alakazam','machop','weepinbell','bellsprout','victreebel','machamp','tentacool','geodude','tentacruel','golem','graveler','rapidash','ponyta',
    'slowpoke','magnemite','slowbro','magneton','farfetchd','doduo','dodrio','seel','grimer','dewgong','muk','shellder','cloyster','gastly','haunter','gengar','hypno','onix','drowzee','kingler','krabby','golbat','electrode','exeggcute','voltorb','cubone','exeggutor','marowak','hitmonlee','hitmonchan','koffing','lickitung','weezing','chansey','rhyhorn','rhydon','tangela','kangaskhan','horsea','goldeen','seadra',
    'seaking','staryu','jynx','scyther','starmie','mr-mime','electabuzz','magmar','tauros','pinsir','magikarp','gyarados','eevee','vaporeon','lapras','ditto','jolteon','porygon','flareon','omastar','omanyte','kabuto','kabutops','zapdos','snorlax','aerodactyl','articuno','moltres','dragonair','dratini','dragonite','mewtwo','mew','bayleef','chikorita','meganium','quilava','typhlosion','totodile','cyndaquil','croconaw',
    'feraligatr','hoothoot','furret','sentret','noctowl','ledyba','crobat','ledian','spinarak','ariados','chinchou','lanturn','pichu','cleffa','igglybuff','togepi','xatu','natu','mareep','togetic','flaaffy','marill','azumarill','bellossom','ampharos','sudowoodo','politoed','jumpluff','hoppip','skiploom','aipom','sunflora','yanma','sunkern','wooper','quagsire','murkrow','espeon','umbreon','slowking','misdreavus','wobbuffet',
    'girafarig','pineco','unown','forretress','dunsparce','gligar','steelix','snubbull','granbull','shuckle','qwilfish','scizor','heracross','sneasel','slugma','ursaring','teddiursa','swinub','magcargo','piloswine','corsola','remoraid','octillery','delibird','mantine','skarmory','houndoom','houndour','kingdra','donphan','phanpy','porygon2','stantler','smeargle','tyrogue','hitmontop','elekid','magby','smoochum','miltank','blissey',
    'raikou','entei','suicune','larvitar','pupitar','tyranitar','lugia','celebi','ho-oh','treecko','grovyle','torchic','combusken','mudkip','swampert','marshtomp','blaziken','linoone','wurmple','poochyena','sceptile','silcoon','beautifly','cascoon','lotad','dustox','lombre','ludicolo','zigzagoon','seedot','nuzleaf','shiftry','taillow','wingull','swellow','mightyena','pelipper','ralts','gardevoir','kirlia','masquerain','surskit',
    'shroomish','breloom','slaking','vigoroth','slakoth','nincada','ninjask','whismur','shedinja','loudred','exploud','makuhita','azurill','nosepass','hariyama','skitty','sableye','aron','mawile','delcatty','meditite','medicham','aggron','electrike','manectric','volbeat','minun','plusle','illumise','gulpin','roselia','swalot','carvanha','sharpedo','wailmer','wailord','numel','torkoal','camerupt','grumpig','spoink','spinda',
    'vibrava','trapinch','flygon','cacturne','swablu','lairon','lunatone','solrock','barboach','whiscash','altaria','seviper','zangoose','baltoy','claydol','corphish','cacnea','lileep','cradily','armaldo','crawdaunt','anorith','shuppet','banette','duskull','feebas','tropius','castform','kecleon','chimecho','milotic','absol','glalie','wynaut','dusclops','clamperl','spheal','huntail','sealeo','walrein','bagon','snorunt',
    'relicanth','luvdisc','gorebyss','beldum','shelgon','salamence','regirock','metagross','metang','regice','groudon','registeel','kyogre','latias','latios','grotle','torterra','rayquaza','turtwig','deoxys-normal','chimchar','monferno','infernape','starly','jirachi','prinplup','bidoof','piplup','staravia','empoleon','staraptor','bibarel','kricketot','luxray','roserade','cranidos','kricketune','shinx','budew','shieldon',
    'rampardos','mothim','wormadam-plant','bastiodon','burmy','combee','vespiquen','cherubi','pachirisu','cherrim','shellos','gastrodon','buizel','drifloon','luxio','lopunny','mismagius','ambipom','drifblim','purugly','floatzel','chingling','honchkrow','buneary','bronzor','glameow','stunky','skuntank','bronzong','bonsly','mime-jr','gible','garchomp','spiritomb','munchlax','riolu','lucario','gabite','happiny','hippowdon',
    'drapion','chatot','hippopotas','finneon','skorupi','mantyke','toxicroak','carnivine','lumineon','weavile','magnezone','croagunk','rhyperior','snover','abomasnow','lickilicky','togekiss','electivire','magmortar','tangrowth','leafeon','yanmega','mamoswine','gliscor','porygon-z','froslass','gallade','glaceon','probopass','dusknoir','rotom','azelf','uxie','dialga','mesprit','cresselia','palkia','regigigas','darkrai','heatran',
    'manaphy','phione','victini','snivy','giratina-altered','serperior','shaymin-land','arceus','pignite','servine','tepig','emboar','dewott','samurott','patrat','oshawott','watchog','herdier','purrloin','lillipup','stoutland','liepard','pansear','simisage','pansage','panpour','musharna','simipour','munna','pidove','blitzle','unfezant','tranquill','zebstrika','gigalith','boldore','roggenrola','woobat','drilbur','excadrill',
    'swoobat','conkeldurr','gurdurr','tympole','palpitoad','simisear','seismitoad','throh','sawk','sewaddle','swadloon','leavanny','venipede','whirlipede','scolipede','audino','cottonee','whimsicott','lilligant','basculin-red-striped','sandile','krokorok','krookodile','darmanitan-standard','darumaka','maractus','dwebble','crustle','petilil','scraggy','scrafty','sigilyph','cofagrigus','yamask','tirtouga','carracosta','archen','archeops',
    'garbodor','trubbish','timburr','zoroark','zorua','cinccino','minccino','gothita','gothitelle','gothorita','solosis','reuniclus','duosion','swanna','ducklett','vanillite','vanilluxe','vanillish','deerling','sawsbuck','escavalier','karrablast','emolga','amoonguss','foongus','jellicent','alomomola','frillish','galvantula','joltik','ferroseed','klink','ferrothorn','klang','eelektrik','eelektross','tynamo','klinklang','elgyem',
    'lampent','beheeyem','chandelure','litwick','axew','beartic','haxorus','fraxure','cubchoo','cryogonal','mienfoo','accelgor','shelmet','stunfisk','mienshao','golurk','druddigon','golett','pawniard','rufflet','bouffalant','bisharp','braviary','vullaby','heatmor','mandibuzz','durant','zweilous','larvesta','hydreigon','volcarona','cobalion','virizion','terrakion','thundurus-incarnate','tornadus-incarnate','zekrom','reshiram','landorus-incarnate',
    'keldeo-ordinary','meloetta-aria','kyurem','deino','genesect','quilladin','chespin','chesnaught','fennekin','braixen','froakie','frogadier','delphox','greninja','bunnelby','fletchling','talonflame','diggersby','fletchinder','scatterbug','litleo','spewpa','pyroar','vivillon','flabebe','florges','gogoat','skiddo','floette','pancham','furfrou','meowstic-male','pangoro','espurr','honedge','aromatisse','aegislash-shield','doublade','spritzee',
    'swirlix','inkay','binacle','slurpuff','malamar','barbaracle','clauncher','dragalge','clawitzer','skrelp','helioptile','heliolisk','tyrantrum','amaura','tyrunt','aurorus','sylveon','dedenne','carbink','goomy','hawlucha','sliggoo','phantump','trevenant','goodra','klefki','pumpkaboo-average','bergmite','gourgeist-average','avalugg','noibat','noivern','diancie','xerneas','yveltal','zygarde-50','volcanion','hoopa','rowlet','dartrix',
    'decidueye','litten','torracat','incineroar','brionne','popplio','primarina','toucannon','pikipek','trumbeak','yungoos','gumshoos','vikavolt','charjabug','grubbin','crabrawler','crabominable','oricorio-baile','ribombee','cutiefly','rockruff','lycanroc-midday','wishiwashi-solo','mareanie','toxapex','mudbray','mudsdale','dewpider','araquanid','fomantis','morelull','lurantis','salandit','salazzle','shiinotic','bewear','stufful','steenee','tsareena',
    'bounsweet','oranguru','comfey','passimian','wimpod','golisopod','palossand','sandygast','pyukumuku','type-null','silvally','komala','turtonator','togedemaru','mimikyu-disguised','minior-red-meteor','bruxish','hakamo-o','jangmo-o','drampa','dhelmise','kommo-o','tapu-fini','tapu-koko','tapu-lele','cosmog','solgaleo','lunala','cosmoem','nihilego','pheromosa','buzzwole','xurkitree','celesteela','kartana','guzzlord','tapu-bulu','necrozma',
    'poipole','naganadel','magearna','marshadow','stakataka','blacephalon','meltan','zeraora','melmetal','grookey','thwackey','rillaboom','scorbunny','raboot','cinderace','drizzile','sobble','skwovet','inteleon','corvisquire','rookidee','greedent','corviknight','dottler','nickit','orbeetle','blipbug','thievul','gossifleur','dubwool','eldegoss','wooloo','chewtle','drednaw','rolycoly','boltund','yamper','carkol','coalossal','applin',
    'appletun','silicobra','sandaconda','cramorant','arrokuda','barraskewda','toxel','sizzlipede','toxtricity-amped','centiskorch','sinistea','clobbopus','grapploct','polteageist','hattrem','hatenna','hatterene','impidimp','morgrem','obstagoon','grimmsnarl','perrserker','mr-rime','cursola','sirfetchd','runerigus','falinks','alcremie','milcery','pincurchin','frosmoth','snom','stonjourner','eiscue-ice','indeedee-male','morpeko-full-belly','cufant',
    'copperajah','dracozolt','dracovish','arctozolt','arctovish','duraludon','dreepy','drakloak','dragapult','eternatus','zamazenta','zacian','kubfu','zarude','regieleki','urshifu-single-strike','regidrago','glastrier','spectrier','calyrex','flapple',  ];
 
  useEffect(() => {
    CargoPokemon(Pokemon);
  }, [Pokemon]);
     
  function CambioPokemon (pBusqueda){
    setEquipo([])
    setPokemon(pBusqueda);
  }
  function CargoPokemon (pPokemon){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pPokemon}/`)
        .then((res) => res.json())
        .then((data) => {
      setNombre(data.name)
      setNumero(data.id)
      CargoTipos(data.types)
      CargoEquipoRecomendado(data.types)})
      .catch(function(error) {
        Alert.alert("El Pokémon no existe");
      });
  }
  function CargoEquipoRecomendado(pTipos) {
    pTipos.forEach((tipo)=>{
      let Debilidades = esDebil(tipo.type.name);
      Debilidades.forEach((debilidad)=>{
        CargoEquipo(debilidad);
      });
    });
  }
  function CargoEquipo(pDebilidad){
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM pokemons`, [], (tx, results) => {
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
          temp.forEach((unPoke)=>{
            devuelvoPokemon(unPoke.nombre, pDebilidad);
          })
        }});
    });
  }
  function devuelvoPokemon(pPokemon, pDebilidad){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pPokemon}/`)
        .then((res) => res.json())
        .then((data) => {
          let auxTipos = data.types;
          auxTipos.forEach((unTipo)=>{
            if (unTipo.type.name == pDebilidad) {
              TesteoRepetidos(data.name, data.id);
            }
          })
        });
  }
  function TesteoRepetidos(pNombre, pNumero){
    if (equipo.length >= 0) {
      setEquipo([])
    }
    let auxEquipo = equipo;
    let existe = "no"
    auxEquipo.forEach((unPoke)=>{
      if (unPoke.numero == pNumero) {
        existe = "si"
      }
    })
    if (existe == "no"){
      auxEquipo.push({numero:pNumero, nombre:pNombre});
    }
    setEquipo(auxEquipo);
  }
  function CargoTipos(pTipos){
    setTipos([]);
    let temp = []; 
    let aux = 0;
    pTipos.forEach((tipo) => {
      temp.push({texto: "Tipo: "+Traducir(tipo.type.name), id:aux});
      aux += 1;
      let cadenaDebil = "";
      let Debilidades = esDebil(tipo.type.name);
      Debilidades.forEach((unDebil) =>{
        cadenaDebil = cadenaDebil + " " + Traducir(unDebil)
      })
      temp.push({texto:"Débil contra:"+cadenaDebil, id:aux});
      aux += 1;
    });
    setTipos(temp);
  }
  function esDebil (pIngles){
    switch (pIngles) {
      case "grass": return(["fire", "ice", "poison", "flying", "bug"]);
      case "water": return(["grass", "electric"]);
      case "fire": return(["water", "ground", "rock"]);
      case "poison": return(["ground", "psychic"]);
      case "fairy": return(["poison", "steel"]);
      case "flying": return(["electric", "ice", "rock"]);
      case "bug": return(["flying", "rock", "fire"]);
      case "normal": return(["fighting"]);
      case "electric": return(["ground"]);
      case "ground": return(["water", "grass", "ice"]);
      case "fighting": return(["flying", "psychic", "fairy"]);
      case "psychic": return(["bug", "ghost", "dark"]);
      case "steel": return(["fire", "fighting", "ground"]);
      case "rock": return(["water", "grass", "fighting", "ground", "steel"]);
      case "ice": return(["fire", "fighting", "rock", "steel"]);
      case "ghost": return(["ghost", "dark"]);
      case "dragon": return(["ice", "dragon", "fairy"]);
      case "dark": return(["fighting", "bug", "fairy"]);
      default: return(pIngles);
    }
  }
  const listoTiposView = (item) => {
    return (
      <View key={item.id} style={styles.listoTiposView}>
        <PokeTexto 
          text={item.texto}
          style={styles.text2}
        />
      </View>
    );
  };
  const listoEquipoView = (item) => {
    return (
      <View style={styles.listoEquipoView}>
        <PokeTexto 
          text={item.nombre}
          style={styles.text}
         />
        <PokeImagen 
          source={{uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+Math.trunc(item.numero)+".png"}}
          style={styles.image2}
        />
      </View>
    );
  };
  function Traducir(pIngles){
    switch (pIngles) {
      case "grass": return("Planta");
      case "water": return("Agua");
      case "fire": return("Fuego");
      case "poison": return("Veneno");
      case "fairy": return("Hada");
      case "flying": return("Volador");
      case "bug": return("Bicho");
      case "normal": return("Normal");
      case "electric": return("Eléctrico");
      case "ground": return("Tierra");
      case "fighting": return("Lucha");
      case "psychic": return("Psíquico");
      case "steel": return("Acero");
      case "rock": return("Roca");
      case "ice": return("Hielo");
      case "ghost": return("Fantasma");
      case "dragon": return("Dragón");
      case "dark": return("Siniestro");
      default: return(pIngles);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../imagenes/fondo2.jpg')} resizeMode="cover" style={styles.imageBack}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <KeyboardAvoidingView style={styles.keyboardView}>
            <View style={styles.unaLinea}>
              <SelectDropdown
                data={NombresPokemon}
                // defaultValueByIndex={1}
                // defaultValue={'Egypt'}
                onSelect={(selectedItem, index) => {
                  setPokemon(selectedItem);
                }}
                defaultButtonText={'Pokemon'}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={styles.selectDropdown}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                  return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
                selectedRowStyle={styles.dropdown1SelectedRowStyle}
                search
                searchInputStyle={styles.dropdown1searchInputStyleStyle}
                searchPlaceHolder={'Buscar Aqui'}
                searchPlaceHolderColor={'darkgrey'}
                renderSearchInputLeftIcon={() => {
                  return <FontAwesome name={'search'} color={'#444'} size={18} />;
                }}
              />
              <PokeBoton 
                title="Buscar"
                btnColor="#5858FA"
                style={styles.button}
                customPress={() => CambioPokemon(Busqueda)}
              />
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.cartaPrincipal}>
                <PokeTexto 
                  text={Nombre}
                  style={styles.text}
                />
                <PokeImagen 
                  source={{uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+Numero+".png"}}
                  style={styles.image}
                />
              <FlatList
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={Tipos}
                  renderItem={({ item }) => listoTiposView(item)}
                />
            </View>
            </TouchableWithoutFeedback>
            <FlatList
              numColumns={2}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={equipo}
              renderItem={({ item }) => listoEquipoView(item)}
            />
          </KeyboardAvoidingView>
        </View>
      </View>
      </ImageBackground>
   </SafeAreaView>
  )
}

export default ComoVencerlo

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
  },
  generalView: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  text2: {
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  inputStyle: {
    width: 200, 
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  button: {
    width: 100, 
    height: 50,
  },
  cartaPrincipal: {
    margin: 5,
    backgroundColor: "#819FF7",
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
    width: 300, 
    borderWidth: 5,
    borderColor: '#d3d3d3',
  },
  image: {
    width: 150, height: 150,
  },
  cartaSecundaria: {
    margin: 5,
    backgroundColor: "grey",
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 120, height: 120,
    borderWidth: 5,
    borderColor: '#11009E',
  },
  image2: {
    width: 80, height: 80,
  },
  unaLinea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botonImagen: {

  },
  listoTiposView: {

  },
  listoEquipoView: {
    margin: 5,
    backgroundColor: "#819FF7",
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 5,
    width: 130, 
    borderWidth: 5,
    borderColor: '#d3d3d3',
  },
  imageBack: {
    flex: 1,
    justifyContent: "center"
  },
  selectDropdown: {
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
    borderColor: "#d3d3d3",
    borderWidth: 3,
    padding: 5,
    backgroundColor: "#819FF7",
    width: 200, 
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
  },
})