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
                let count = (snap.val().Berat / 1000 * 100)
                let status
                if(count <= percent){
                    status = 'ringan'
                } else {
                    status = 'berat'
                }
                this.setState({percentage: percent, status})  
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
                <Text style={styles.title}>{location != "null" ? location : 'Isi Lokasi Terlebih dahulu!'}</Text>
                <Text style={styles.percentage}>{percentage != null ? `${percentage} %` : '0%'}</Text>
                <Text style={styles.status}>Status : {status != null ? status : 'Isi Batas Terlebih dahulu!'}</Text>
                <Text style={styles.small}>Nama Barang : {name != "null" ? name : '-'}</Text>
                <Text style={styles.small}>Jenis Barang : {type != "null" ? type : '-'}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        fontFamily: 'Montserrat',
        height: '100%'
    }, 
    title: {
        fontSize: 32,
        fontWeight: '600',
        alignItems: 'center',
        marginBottom: 18,
        marginTop: 160
    },
    percentage: {
        fontSize: 28,
        marginVertical: 20,
    },
    status: {
        fontSize: 22,
        marginVertical: 20
    },
    small: {
        fontSize: 18,
        marginTop: 20
    }
})

export default Home