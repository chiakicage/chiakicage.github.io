
// var calc = require('./calc')
let exbuffer;
let expos;

function nxtChar() {
    if (expos >= exbuffer.length)
        return undefined;
    return exbuffer[expos];
}
function getChar() {
    if (expos >= exbuffer.length)
        return undefined;
    return exbuffer[expos++];
}

const obj_type = {
    EMPTY : 0,
    ALPHA : 1,
    DIGIT : 2,
    OTHER : 3
};

let buffer = '';
function charType(ch) {
    if (ch === ' ' || ch === '\n' || ch === '\r' || ch === '\t')
        return obj_type.EMPTY;
    else if ('0' <= ch && ch <= '9')
        return obj_type.DIGHT;
    else if (('a' <= ch && ch <= 'z') || ('A' <= ch && ch <= 'Z'))
        return obj_type.ALPHA;
    else
        return obj_type.OTHER;
}
function nxtLexeme() {
    if (buffer) return buffer;
    if (!nxtChar()) return undefined;
    while (charType(nxtChar()) === obj_type.EMPTY) 
        getChar();
    if (charType(nxtChar()) === obj_type.DIGHT) {
        while (charType(nxtChar()) === obj_type.DIGHT)
            buffer += getChar();
    } else if (charType(nxtChar()) === obj_type.ALPHA) {
        while (charType(nxtChar()) === obj_type.ALPHA)
            buffer += getChar();
    } else if (charType(nxtChar()) === obj_type.OTHER) {
        buffer = getChar();
        if (buffer === '<' || buffer === '>') {
            if (nxtChar() === '=')
                buffer += getChar();
        }
    }
    return buffer;
}
function getLexeme() {
    let ret = nxtLexeme();
    buffer = '';
    return ret;
}

function init(expr) {
    exbuffer = expr, expos = 0, buffer = '';
}
function reset() {
    expos = 0, buffer = '';
}

let func = {
    'sin' : Sin, 
    'cos' : Cos,
    'abs' : Abs,
    'sqrt' : Sqrt
};

function match(ss) {
    if (getLexeme() !== ss) throw 'Unmatch!'
}

    
function Unit0() {
    let ss = getLexeme();
    // console.log(ss);
    if (charType(ss[0]) === obj_type.DIGHT) {
        if (nxtLexeme() === '.') {
            match('.'), ss += '.';
            if (charType(nxtLexeme()[0]) !== obj_type.DIGHT) {
                throw 'Illegal Number!';
            }
            ss += getLexeme();
        }
        return number(trans(ss));
    } else if (charType(ss[0]) === obj_type.ALPHA) {
        if (ss === 'x') return X;
        else if (ss === 'y') return Y;
        else if (ss === 'e') return number(E);
        else if (ss === 'pi') return number(PI);
        else if (func[ss]) {
            match('(');
            let tmp = Unit4();
            match(')');
            return func[ss](tmp);
        } else {
            throw 'Illegal Token!';
        }
    } else if (charType(ss[0]) === obj_type.OTHER) {
        if (ss[0] === '(') {
            let tmp = Expression();
            match(')');
            return tmp;
        } else {
            throw 'Illegal Token!';
        }
    }
}
function Unit1() {
    let ret = [Unit0()];
    while (nxtLexeme() === '^') {
        match('^');
        ret.push(Unit0());
    }
    for (let i = ret.length - 2; i >= 0; --i) {
        ret[i] = Pow(ret[i + 1], ret[i]);
    }
    return ret[0];
}
function Unit2() {
    let sign = 1;
    let ss = nxtLexeme();
    // console.log('123');
    if (ss[0] === '+' || ss[0] === '-') {
        while (ss.nxtLexeme() === '-' || ss.nxtLexeme() === '+') {
            if (ss.getLexeme() === '-') sign = -sign;
        }
    }
    if (sign === -1) return Neg(Unit1());
    else return Unit1();
}
function Unit3() {
    let ret = Unit2();
    // console.log(ret);
    while (nxtLexeme() === '*' || nxtLexeme() === '/') {
        if (getLexeme() === '*') {
            ret = Mul(ret, Unit2());
        } else {
            ret = Div(ret, Unit2());
        }
    }
    return ret;
}
function Unit4() {
    let ret = Unit3();
    // console.log(ret);
    while (nxtLexeme() === '+' || nxtLexeme() === '-') {
        if (getLexeme() === '+') {
            ret = Add(ret, Unit3());
        } else {
            ret = Sub(ret, Unit3());
        }
    }
    return ret;
}
    

function Expression() {
    let ret = Unit4(), op = nxtLexeme();
    // console.log(op);
    if (op === '=' || op === '<' || op === '>' || op === '<=' || op === '>=') {
        if (op === '=') {
            getLexeme();
            ret = Equal(ret, Unit4());
        } else if (op === '<' || op === '<=') {
            getLexeme();
            ret = Lesseq(ret, Unit4());
        } else if (op === '>' || op === '>=') {
            getLexeme();
            ret = Greateq(ret, Unit4());
        }
    }
    // console.log(ret);
    // if (nxtLexeme()) throw 'Illegal Expression!';
    // reset();
    return ret;
}
