import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ActivityIndicator } from 'react-native';
import axios from 'axios';
import colorScheme from './Color'

export default function App() {
  const [getQuote, setQuote] = useState('Klik Muat Ulang')
  const [getAuthor, setAuthor] = useState('App')
  const [getTags, setTags] = useState(['Quotes', 'Generator'])
  const [isLoading, setIsLoading] = useState(true)
  const [getBGColor, setBGColor] = useState('azure')
  const [getTextColor, setTextColor] = useState('black')
  const [getBtnColor, setBtnColor] = useState('azure')

  const getRandomQuote = () => {
    setIsLoading(true)
    axios.get('https://api.quotable.io/quotes/random')
      .then(response => {
        setQuote(response.data[0].content)
        setAuthor(response.data[0].author)
        setTags(response.data[0].tags)
        setIsLoading(false)
        getRandomScheme()
      })
      .catch(error => {
        console.error(error);
        setQuote('Terjadi Kesalahan')
        setAuthor('App')
        setTags(['Error', 'Kesalahan'])
        setIsLoading(false)
        getRandomScheme()
      });
  }

  const getRandomScheme = () => {
    const randomIndex = Math.floor(Math.random() * colorScheme.length)
    const randomScheme = colorScheme[randomIndex]
    setBGColor(randomScheme.bg)
    setTextColor(randomScheme.text)
    setBtnColor(randomScheme.btn)
  }

  useEffect(() => {
    getRandomQuote()
  }, [])

  return (
    <View style={[styles.container, {backgroundColor: getBGColor}]}>
      <TouchableHighlight onPress={getRandomQuote}>
        <View style={{alignItems: 'center', backgroundColor: getBtnColor, paddingVertical: 10, paddingHorizontal: 20, borderWidth: 2}}>
          <Text style={{color: getTextColor, fontWeight: 'bold'}}>Muat Ulang</Text>
        </View>
      </TouchableHighlight>
      <View>
        { 
          isLoading ? 
          <ActivityIndicator size="large" color={getTextColor} /> 
          : 
          <View>
            <View style={styles.tagsContainer}>
              {getTags.map((item, index) => (
                <Text key={index} style={[styles.tag, {color: getTextColor, borderColor: getTextColor}]}>{item}</Text>
              ))}
            </View>
            <Text style={[styles.quote, {color: getTextColor}]}>"{getQuote}"</Text>
            <Text style={[styles.author, {color: getTextColor}]}>{getAuthor}</Text>
          </View>
        }
      </View>
      <View style={styles.namaNim}>
        <View style={{paddingHorizontal: 10, opacity: .5}}>
          <Text style={[styles.name, {color: getTextColor}]}>Aulia Nurfajila Hasan</Text>
          <Text style={[styles.nim, {color: getTextColor}]}>531420006</Text>
        </View>
        <View style={{borderLeftWidth: 1, borderRightWidth: 1, paddingHorizontal: 10, opacity: .5}}>
          <Text style={[styles.name, {color: getTextColor}]}>Rahayu Halid</Text>
          <Text style={[styles.nim, {color: getTextColor}]}>531420015</Text>
        </View>
        <View style={{paddingHorizontal: 10, opacity: .5}}>
          <Text style={[styles.name, {color: getTextColor}]}>Andresito Polamolo</Text>
          <Text style={[styles.nim, {color: getTextColor}]}>531420011</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tagsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  quote: {
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    margin: 13,
  },
  tag : {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    margin: 3,
    fontSize: 12,
    borderRadius: 10,
  },
  author: {
    margin: 5,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  name: {
    textAlign: 'center',
    fontSize: 12,
  },
  nim: {
    textAlign: 'center',
    fontSize: 14,
  },
  namaNim: {
    flexDirection: 'row',
  
  }
});
