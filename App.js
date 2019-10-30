import React from 'react';
import { StyleSheet, Text, FlatList, Dimensions, View } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';

const { width, height } = Dimensions.get('screen');

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.arrayHolder = []
  }


  componentDidMount() {
    this.makeRequestData();
  }

  makeRequestData = () => {
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "get",
      headers: {
        "content-type": "application/json"
      }
    }).then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          data: res
        });
        this.arrayHolder = res;
      }).catch((err) => {
        console.log(err);
      })
  }


  handleSearch = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayHolder.filter(item => {
      const itemData = `${item.name.toUpperCase()}   
      ${item.email.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    this.setState({ data: newData });
  }

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..."
      lightTheme
      round
      onChangeText={text => this.handleSearch(text)}
      autoCorrect={false}
      value={this.state.value}
    />;
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: width,
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList contentContainerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              subtitle={item.email}
            />
          )}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={this.renderHeader}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: width,
    marginTop: "5%",
    height: height / 0.5
  },
});
