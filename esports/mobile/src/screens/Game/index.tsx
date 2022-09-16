import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo-nlw-esports.png';

import { Entypo } from '@expo/vector-icons';

import { styles } from './styles';
import { THEME } from '../../theme';

import { GameParams } from '../../@types/navigation';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

export function Game() {
    const route = useRoute();
    const game = route.params as GameParams;
    const navigation = useNavigation();
    const [duos, setDuos] = useState<DuoCardProps[]>([]);

    useEffect( () => {
        fetch(`http://192.168.15.2:5000/games/${game.id}/ads`)
        .then(response => response.json())
        .then(data => setDuos(data))
      }, []);

    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo 
                            name="chevron-thin-left"
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />
                    </TouchableOpacity>

                    <Image 
                        source={logoImg}
                        style={styles.logo}
                    />
                    
                    <View style={styles.right}/>
                </View>

                <Image 
                    source={ {uri: game.bannerUrl} }
                    style={styles.cover}
                    resizeMode="center"
                />

                <Heading 
                    title={game.title}
                    subtitle="Conecte-se e comece a jogar!"
                />

                <FlatList 
                    data={duos}
                    keyExtractor={item => item.id}
                    renderItem={ ({item}) => (
                        <DuoCard 
                            data={item}
                            onConnect={ () => { } }
                        />
                    ) }
                    horizontal
                    style={styles.containerList}
                    contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={ () => (
                        <Text style={styles.emptyListText}>
                            Não há anúncios publicados ainda.
                        </Text>
                    ) }
                />                
            </SafeAreaView>
        </Background>
    );
}