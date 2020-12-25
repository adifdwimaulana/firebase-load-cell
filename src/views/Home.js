import React from 'react'
import { Button, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { db } from '../config'

class Home extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            weight: null,
            location: null,
            status: null,
            name: null,
            type: null,
            limit: null,
            percentage: null
        }
    }

    componentDidMount = () => {
        db.ref('/').on('value', (snap) => {
            console.log(snap.val())
            if(snap.val().Batas != "null"){
                let percent = (snap.val().Berat / snap.val().Batas) * 100
                this.setState({percentage: percent})  
            }
            this.setState({
                weight: snap.val().Berat,
                location: snap.val().Nomer,
                type: snap.val().Jenis,
                name: snap.val().Nama,
                limit: snap.val().Batas
            })
        })
    }

    render(){
        const { navigation } = this.props
        const { weight, location, status, name, type, limit, percentage } = this.state
        return(
            <View style={styles.container}>
                <Text style={styles.title}>{location != "null" ? location : 'Isi Lokasi terlebih dahulu!'}</Text>
                <Text style={styles.percentage}>{percentage != null ? `${percentage} %` : '0%'}</Text>
                <Text style={styles.name}>Nama Barang {name != "null" ? name : null}</Text>
                <Text style={styles.type}>Jenis Barang{type != "null" ? type : null}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Montserrat'
    }, 
    title: {
        fontSize: 28,
        fontWeight: '600',
        alignItems: 'center',
        marginBottom: 18
    }
})

export default Home