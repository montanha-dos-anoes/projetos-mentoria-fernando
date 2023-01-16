function No(data) {
    this.next = null;
    this.data = data;
}

class ListaLigada{
    head = null;

    adicionarNoComeco(data){
        const novoNo = new No(data);
        if (!this.head) {
            this.head = novoNo;
        } else {
            novoNo.next = this.head
            this.head = novoNo
        }
    };

    adicionarNoFinal(data){
        let novoNo = new No(data);
        if (!this.head) {
            this.head = novoNo;
        } else {
            let aux = this.head
            while (aux.next) {
                aux = aux.next
            }
            aux.next = novoNo
        }
    }

    remover(data){

        if (!this.head) {
            return
        }
        if (this.head.data === data) {
            this.head = this.head.next
        } else {
            let aux = this.head
            while (aux.next != null  && aux.next.data != data) {
                aux = aux.next
            }
            if(aux.next){
                aux.next = aux.next.next
            }
            else{
                console.log('Não existe o valor', data)   
            }
        }
    }


    removerPorIndice(position){

        
        if (!this.head) {
            return
        }
        
        if (this.head.data === position) {
            this.head = this.head.next
        } else {
            let aux = this.head
            let currentIndex = 1
            while (aux.next != null  && currentIndex != position) {
                currentIndex++
                aux = aux.next
                // console.log(currentIndex)
                
            }
            if(currentIndex){
                aux.next = aux.next.next
                // console.log('entrou aqui?', currentIndex)
            }
            else{
                console.log('Não existe o valor')   
            }
        }
    }

    print(separator = ' -> '){
        const result = [];
        let temp = this.head;
        while (temp) {
            result.push(temp.data);
            // console.log(temp.data)
            temp = temp.next;
        }
        return result.join(separator);
    };

}

const list = new ListaLigada();

// list.adicionarNoComeco(0);
// list.adicionarNoComeco(1);
// list.adicionarNoComeco(3);
// list.adicionarNoComeco(4);
// list.adicionarNoComeco(7);

list.adicionarNoFinal(1);
list.adicionarNoFinal(2);
list.adicionarNoFinal(3);
list.adicionarNoFinal(4);
list.adicionarNoFinal(5);
list.adicionarNoFinal(6);

console.log(list.print());
list.removerPorIndice(3)
console.log(list.print());
