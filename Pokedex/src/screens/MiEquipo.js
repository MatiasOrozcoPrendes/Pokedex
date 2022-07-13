import React, { useState, useEffect } from "react";
import {StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, FlatList, ImageBackground} from "react-native";
import PokeEntrada from '../components/PokeEntrada';
import PokeBoton from '../components/PokeBoton';
import PokeBotonImagen from '../components/PokeBotonImagen';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DatabaseConnection from "../database/database-connection";
const db = DatabaseConnection.getConnection();

const MiEquipo = () => {
    const [pokemon, setPokemon]= useState('');
    const [pokemons, setPokemons] = useState([]);
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
      cargoLista();
    }, []);
    const cargoLista = () => {
      setPokemons([]);
      db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM pokemons`, [], (tx, results) => {
          if (results.rows.length > 0) {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
              setPokemons(temp);
          }});
      });
    }
    const listItemView = (item) => {
      return (
        <View style={styles.listItemView}>
          <PokeBotonImagen 
              title={item.nombre}
              style={styles.botonImagen}
              imageWidth= {50}
              imagesHeight= {50}
              btnColor="819FF7"
              source={{uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+Math.trunc(item.numero)+".png"}}
              customPress={() => borrarPokemon(item.nombre)}
            />
        </View>
      );
    };
    const esEquipo = (pNombre, pNumero) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM pokemons WHERE nombre = ?",
            [pNombre],
            (tx, results) => {
              if (results.rows.length > 0) {
                Alert.alert("El Pokemon ya esta en el Equipo");
              } else {
                agregarPokemon(pNombre, pNumero);
                cargoLista();
              }
            }
          );
        });
      };
    function CargoPokemon (pPokemon){
        fetch(`https://pokeapi.co/api/v2/pokemon/${pPokemon}/`)
        .then((res) => res.json())
        .then((data) => {
            esEquipo(data.name, data.id)})
            .catch(function(error) {
              Alert.alert("El Pokémon no existe");
        });
    }      
    const agregarPokemon = (pNombre, pNumero) => {
        debugger;
        db.transaction((tx) => {
          tx.executeSql(
            `INSERT INTO pokemons (nombre, numero) VALUES (?, ?)`,
            [pNombre, pNumero],
            (tx, results) => {
              // validar resultado
              if (results.rowsAffected > 0) {
                Alert.alert("Exito", "Pokemon agregado al equipo!!!",
                  [{text: "Ok",},],
                  { cancelable: false }
                );
              } else {
                Alert.alert("Error al agregar el Pokemon");
              }
            }
          );
        });
      };
    const borrarPokemon = (pNombre) => {
      Alert.alert("Quitar del equipo", "Esta seguro?", [
        {
          text: "SI",
          onPress() {
            db.transaction((tx) => {
              tx.executeSql(
                `DELETE FROM pokemons WHERE nombre = ?`,
                [pNombre],
                (tx, results) => {
                  // validar resultado
                  if (results.rowsAffected > 0) {
                    Alert.alert("Pokemon Eliminado");
                    cargoLista();
                  } else {
                    Alert.alert("El Pokemon no esta en el equipo");
                  }
                }
              );
            });
          },
        },
        {
          text: "No",
        },
      ]);
        
      };
     const limpiarEquipo = () => {
      Alert.alert("Eliminar el equipo completo", "Esta seguro?", [
        {
          text: "SI",
          onPress() {
            db.transaction( (txn) => {
              txn.executeSql('DELETE FROM pokemons', [], (tx, results) => {
                // validar resultado
                if (results.rowsAffected > 0) {
                  Alert.alert("Equipo Eliminado");
                  setPokemons([]);
                  cargoLista();
                } else {
                  Alert.alert("Error eliminar");
                }
              });
            });
          },
        },
        {
          text: "No",
        },
      ]);
      
      }
  return (
    <SafeAreaView style={styles.container}>
     <ImageBackground source={require('../imagenes/fondo2.jpg')} resizeMode="cover" style={styles.imageBack}>
        <View style={styles.viewContainer}>
        <KeyboardAvoidingView >
          <View style={styles.generalView}>
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
              <View style={styles.unaLinea}>
                <PokeBoton 
                  title="Agregar"
                  btnColor="#5858FA"
                  style={styles.button}
                  customPress={() => CargoPokemon(pokemon)}
                />
                <PokeBoton 
                  title="Eliminar"
                  btnColor="#FE642E"
                  style={styles.button}
                  customPress={() => limpiarEquipo()}
                />
              </View>
            <FlatList
              numColumns={2}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={pokemons}
              renderItem={({ item }) => listItemView(item)}
            />
          </View>
          </KeyboardAvoidingView>
      
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default MiEquipo

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
  },
  generalView: {
    flex: 1,
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  inputStyle: {
    width: 300, 
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  button: {
    width: 100, 
    height: 50,
  },
  listItemView: {
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
  botonImagen: {
    width: 110,
    height: 80,
  },
  unaLinea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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