function Choice() {

}

Choice.add_choice = function () {
    $('#choices').append("<tr><td><input class='form-control'><input type='checkbox' >correct answer<br></td></tr>");
}

Choice.show_answer=function(){
    $(".true").each(function(){
        this.checked=true;
    })
    $(".false").each(function(){
        this.checked=false;
    })
}

Choice.get_checkbox_value = function () {
    var answers = [];
    var a = -1;
    $('#choices input:checkbox').each(function () {
        ++a;
        this.checked ? answers.push(a) : answers.push("c");
    });
    return answers;
}

Choice.get_input_value = function () {
    var choices = [];
    $('#choices input:text').each(function () {
        choices.push(this.value);
    });
    return choices;
}

Choice.create_choices = function (answer, choice) {
    var choices = [];
    var c_obj = {};
    for (var a = 0, b = choice.length; a < b; a++) {
        c_obj['body'] = choice[a];
        c_obj['is_correct'] = answer[a] == a ? true : false;
        c_obj['id'] = rand_number();
        choices.push(c_obj);
        c_obj = {};
    }
    return choices;
}

Choice.create_question = function (choices, title, body, type, lessonid, questionid) {
    var question = {};
    question["choices"] = choices;
    question["title"] = title;
    question["body"] = body;
    question["type"] = type;
    question["lessonid"] = lessonid;
    question["id"] = rand_number() || questionid;
    return question;
}


