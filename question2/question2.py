def get_missing_letters(sentence):
    alpha = "abcdefghijklmnopqrstuvwxyz"
    panagram = set()
    for a in alpha:
        panagram.add(a)
    for s in sentence:
        if s.lower() in panagram:
            panagram.remove(s.lower())    
    return "".join(panagram)


print get_missing_letters("A quick brown fox jumps over the lazy dog")
print get_missing_letters("A slow yellow fox crawls under the proactive dog")