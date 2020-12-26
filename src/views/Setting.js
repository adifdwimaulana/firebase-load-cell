import React from 'react'
import { Button, View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import { db } from '../config'

class Setting extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            location: '',
            name: '',
            type: '',
            limit: ''
        }
    }

    handleSubmit = (location, name, type, limit) => {
        console.log("Submitting")
        db.ref('/').update({
            Batas: limit,
            Nama: name,
            Jenis: type,
            Nomer: location
        })
        .then(() => {
            console.log("Success")
            this.setState({ location: '', name: '', type: '', limit: '' })
            alert('Data berhasil di-update!');
        })
    }

    validate = (value) => {
        if(value == '' || value == null || value == undefined){
            return true
        } else {
            return false
        }
    }

    render(){
        const { navigation } = this.props
        const { location, name, type, limit } = this.state
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Form</Text>
                <View style={styles.wrapper}>
                    <Text style={styles.label}>Lokasi</Text>
                    <TextInput 
                        style={styles.textInput}
                        onChangeText={location => this.setState({ location })}
                        value={location}
                        placeholder="Gudang A"
                    />
                </View>
                <View style={styles.wrapper}>
                    <Text style={styles.label}>Nama Barang</Text>
                    <TextInput 
                        style={styles.textInput}
                        onChangeText={name => this.setState({ name })}
                        value={name}
                        placeholder="Cairan Infus 100 mL"
                    />
                </View>
                <View style={styles.wrapper}>
                    <Text style={styles.label}>Jenis Barang</Text>
                    <TextInput 
                        style={styles.textInput}
                        onChangeText={type => this.setState({ type })}
                        value={type}
                        placeholder="Cairan"
                    />
                </View>
                <View style={styles.wrapper}>
                    <Text style={styles.label}>Batas Berat (%)</Text>
                    <TextInput 
                        style={styles.textInput}
                        onChangeText={limit => this.setState({ limit })}
                        value={limit}
                        placeholder="20"
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.wrapperBtn}>
                    <TouchableOpacity
                        onPress={() => this.handleSubmit(location, name, type, limit)}
                        style={styles.btn}
                        disabled={this.validate(location) || this.validate(name) || this.validate(type) || this.validate(limit)}
                    >
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'Montserrat',
    },  
    title: {
        fontSize: 24,
        textTransform: "uppercase",
        textAlign: 'center',
        marginVertical: 24
    }, 
    wrapper: {
        marginHorizontal: 24,
        marginVertical: 6
    },
    label: {
        fontSize: 16
    },
    textInput: {
        borderBottomColor: "#000",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 16,
        color: "#161F30",
        marginBottom: 24
    },
    wrapperBtn: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row'
    },
    btn: {
        height: 40,
        backgroundColor: "#6861CF",
        borderRadius: 4,
        marginTop: 6,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 28
    },
    submitText: {
        fontFamily: "Montserrat",
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
    },
})

export default Setting